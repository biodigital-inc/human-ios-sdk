/**

 A Human plugin to support Google Cardboard viewing.

 API usage:
 ----------

 var cardboard = Human.plugins.cardboard;

 cardboard.setOrbiting(true);   // Set eye orbiting look (default)
 cardboard.setFOV(45);          // Set horizontal field-of-view (default)
 cardboard.setEyeSep(0.2);      // Set eye separation (default)
 cardboard.setEnabled(true);    // Activate (disabled by default)

 URL options
 -----------

 1. Activate cardboard effect, rotate eye about look:

    https://localhost/?cardboard=true

 2. Activate cardboard effect, rotate look about eye:

    https://localhost/?cardboard=true&cardboardOrbiting=false

 */
(function () {

    "use strict";

    var math = Human.math;

    var scene;
    var canvas;

    var orbiting = true; // When true, eye orbits look, else look orbits eye
    var eyeSep = 0.2; // Eye separation
    var focalLength = 20.0;
    var fov = 45; // Horizontal field of view
    var near = 0.1;
    var DEGTORAD = 0.0174532925;
    var wd2 = near * Math.tan(DEGTORAD * fov / 2);
    var renderingSub;
    var saveOptics;

    var orientationAngleLookup = {
        'landscape-primary': 90,
        'landscape-secondary': -90,
        'portrait-secondary': 180,
        'portrait-primary': 0
    };

    var orientation;
    var orientationAngle = 0;
    var acceleration = vec3.create();
    var accelerationIncludingGravity = vec3.create();

    var enabled = false;

    var eyeTemp = vec3.create();
    var lookTemp = vec3.create();
    var sepVec = vec3.create(); // Eye separation vector, origin at left eye

    var leftEye = vec3.create();
    var leftLook = vec3.create();
    var rightEye = vec3.create();
    var rightLook = vec3.create();

    var rendering = (function () { // Called on left and right passes


        return function (params) {

            var camera = scene.getCamera();
            var halfWidth = canvas.width / 2.0;
            var height = canvas.height;
            var ratio = canvas.width / canvas.height;
            var ndfl = near / focalLength;

            switch (params.pass) {

                case 0: // Right eye

                    var up = camera.up;
                    eyeTemp = camera.eye;
                    lookTemp = camera.look;

                    vec3.subtract(sepVec, eyeTemp, lookTemp);
                    vec3.cross(sepVec, up, sepVec);
                    vec3.normalize(sepVec, sepVec);
                    vec3.scale(sepVec, sepVec, eyeSep / 2.0);

                    vec3.add(rightEye, camera.eye,sepVec);
                    vec3.add(rightLook, camera.look, sepVec);

                    scene.setCamera({eye: rightEye, look: rightLook});

                    scene.setProjection({
                        type: "frustum",
                        left: -ratio * wd2 - 0.5 * eyeSep * ndfl,
                        right: ratio * wd2 - 0.5 * eyeSep * ndfl,
                        top: wd2 * 2,
                        bottom: -wd2 * 2
                    });

                    scene.setViewport(halfWidth, 0, halfWidth, height);

                    break;

                case 1: // Left eye

                    vec3.subtract(leftEye, camera.eye, sepVec);
                    vec3.subtract(leftLook, camera.look, sepVec);
                    scene.setCamera({eye: leftEye, look: leftLook});

                    scene.setProjection({
                        left: -ratio * wd2 + 0.5 * eyeSep * ndfl,
                        right: ratio * wd2 + 0.5 * eyeSep * ndfl,
                        top: wd2 * 2,
                        bottom: -wd2 * 2
                    });

                    scene.setViewport(0, 0, halfWidth, height);

                    break;
            }
        };

    })();

    var orientationChange = function () {
        orientation = window.screen.orientation || window.screen.mozOrientation || window.msOrientation || null;
        orientationAngle = orientation ? (orientationAngleLookup[orientation] || 0) : 0;
    };

    var eulerToQuaternion = function (euler, dest) {
        var c1 = Math.cos(euler[0] / 2);
        var c2 = Math.cos(euler[1] / 2);
        var c3 = Math.cos(euler[2] / 2);
        var s1 = Math.sin(euler[0] / 2);
        var s2 = Math.sin(euler[1] / 2);
        var s3 = Math.sin(euler[2] / 2);
        dest[0] = s1 * c2 * c3 + c1 * s2 * s3;
        dest[1] = c1 * s2 * c3 - s1 * c2 * s3;
        dest[2] = c1 * c2 * s3 - s1 * s2 * c3;
        dest[3] = c1 * c2 * c3 + s1 * s2 * s3;
        return dest;
    };

    var deviceOrientation = (function () {

        var euler = vec3.create();
        var tempVec3a = vec3.create();
        var tempVec3b = vec3.create();
        var tempVec3c = vec3.create();
        var tempVec3d = vec3.create();
        var newUp = vec3.create();
        var newEye = vec3.create();
        var newLook = vec3.create();

        var reflectQuaternion = quat.create();
        reflectQuaternion[0] = -Math.sqrt(0.5);
        reflectQuaternion[3] = Math.sqrt(0.5);

        var quaternion = quat.create();
        var orientQuaternion = quat.create();
        var alignQuaternion = quat.create();
        var orientMatrix = mat4.create();

        return function (e) {

            var alpha = e.alpha ? DEGTORAD * e.alpha : 0; // Z
            var beta = e.beta ? DEGTORAD * e.beta : 0; // X'
            var gamma = e.gamma ? DEGTORAD * e.gamma : 0; // Y'
            var orient = DEGTORAD * (window.orientation || 0);

            euler[0] = beta;
            euler[1] = alpha;
            euler[2] = -gamma;

            eulerToQuaternion(euler, quaternion);

            quat.multiply(quaternion, quaternion, reflectQuaternion);
            quat.setAxisAngle(orientQuaternion, [0, 0, 1], -orient);
            quat.multiply(quaternion, quaternion, orientQuaternion);
            quat.multiply(quaternion, quaternion, alignQuaternion);
            mat4.fromQuat(orientMatrix, quaternion);

            var camera = Human.view.camera;
            var eye = math.vec3ObjToArray(camera.eye, tempVec3a);
            var look = math.vec3ObjToArray(camera.look, tempVec3b);

            vec3.subtract(tempVec3c, look, eye);
            var lenEyeLook = Math.abs(vec3.length(tempVec3c));

            tempVec3d[0] = 0;
            tempVec3d[1] = 0;
            tempVec3d[2] = lenEyeLook;

            vec3.transformMat4(tempVec3d, tempVec3d, orientMatrix);

            newUp[0] = 0;
            newUp[1] = 1;
            newUp[2] = 0;

            vec3.transformMat4(newUp, newUp, orientMatrix);

            if (orbiting) { // Eye rotates about look

                vec3.add(newEye, tempVec3d, look);

                camera.setLookAt({
                    eye: {
                        x: newEye[0],
                        y: newEye[1],
                        z: newEye[2]
                    },
                    up: {
                        x: newUp[0],
                        y: newUp[1],
                        z: newUp[2]
                    }
                });

            } else { // Look rotates about eye

                vec3.subtract(newLook, eye, tempVec3d);

                camera.setLookAt({
                    look: {
                        x: newLook[0],
                        y: newLook[1],
                        z: newLook[2]
                    },
                    up: {
                        x: newUp[0],
                        y: newUp[1],
                        z: newUp[2]
                    }
                });
            }
        };
    })();

    var deviceMotion = function (e) {
        var interval = e.interval;
        var accel = e.acceleration;
        if (accel) {
            acceleration[0] = accel.x;
            acceleration[1] = accel.y;
            acceleration[2] = accel.z;
        }
        var accelGrav = e.accelerationIncludingGravity;
        if (accelGrav) {
            accelerationIncludingGravity[0] = accelGrav.x;
            accelerationIncludingGravity[1] = accelGrav.y;
            accelerationIncludingGravity[2] = accelGrav.z;
        }
        var rotationRate = e.rotationRate;
        //...TODO
    };

    var setOrbiting = function (value) {
        orbiting = value;
    };

    var setFOV = function (value) {
        fov = value || 45;
        wd2 = near * Math.tan(DEGTORAD * fov / 2);
    };

    var setEyeSep = function (value) {
        eyeSep = value;
        Human.renderer.forceRenderFrame();
    };

    var setEnabled = function (enable) {

        enable = !!enable;

        if (enabled === enable) {
            return;
        }

        var nodes;

        if (enable) { // save projection, configure two render passes, attach pre-render callback

            scene.setNumPasses(2);
            saveOptics = scene.getProjection();

            Human.properties.set({"camera.gimbalLockY": false});

            renderingSub = scene.on("rendering", rendering);

            window.addEventListener('orientationchange', orientationChange, false);
            window.addEventListener('deviceorientation', deviceOrientation, false);
            window.addEventListener('devicemotion', deviceMotion, false);

        } else { // Remove our lookat, restore projection, configure one render pass, detach pre-render callback

            scene.setProjection(saveOptics);

            scene.setViewport(0,0, canvas.width,canvas.height);
            scene.setNumPasses(1);
            scene.off(renderingSub);

            window.removeEventListener('orientationchange', orientationChange);
            window.removeEventListener('deviceorientation', deviceOrientation);
            window.removeEventListener('devicemotion', deviceMotion);
        }

        enabled = enable;
    };

    var init = function () {

        scene = Human.renderer.getScene();

        if (!scene) {
            requestAnimationFrame(init);
            return;
        }

        canvas = scene.getCanvas();

        if (!window.OrientationChangeEvent) {
            Human.log.warn("Browser event not supported: orientationchange");
        }

        if (!window.DeviceOrientationEvent) {
            Human.log.warn("Browser event not supported: deviceorientation");
        }

        if (!window.DeviceMotionEvent) {
            Human.log.warn("Browser event not supported: devicemotion");
        }

        setEnabled(true);
    };

    requestAnimationFrame(init);

    Human.addPlugin("cardboard", {
        setOrbiting: setOrbiting,
        setFOV: setFOV,
        setEyeSep: setEyeSep,
        setEnabled: setEnabled
    });
})();

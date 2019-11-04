/**
 Plugin which emphasises objects by making specified objects to recede into the background.

 Usage:

 var revealObjects = Human.plugins.revealObjects;

 // Set a callback to select objects to reveal:

 revealObjects.setSelector((function () {
        var whitelist = {
            "healicoil_procedure_rotator_cuff_storyboards-cannula1_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula1|cannula_010_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula1|cannula_021_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula1|cannula_043_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula1|cannula_054_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula1|cannula_065_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_2_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_2|cannula_010_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_2|cannula_021_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_2|cannula_043_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_2|cannula_054_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_2|cannula_065_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_3_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_3|cannula_010_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_3|cannula_021_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_3|cannula_043_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_3|cannula_054_ID": true,
            "healicoil_procedure_rotator_cuff_storyboards-cannula_3|cannula_065_ID": true
        };
        return function (id) {
            return whitelist[id];
        }
    })());

 // Or set s pattern to find in object IDs, to select them as objects to reveal:

 revealObjects.setPattern("cannula");

 // Wire up some input handlers:

 Human.input.addHandler(function (ctx) {

        ctx.onKeyDown([Human.input.KEY_ENTER], function () {
            revealObjects.reveal({
                dist: 20
            }, function () {
                console.log("Done");
            });
        });

        ctx.onKeyUp([Human.input.KEY_ENTER], function () {
            revealObjects.restore();
        });


        ctx.onKeyDown([Human.input.KEY_ESCAPE], function () {
            revealObjects.reset();
        });
    });
 */
(function () {

    "use strict";

    Human.addPlugin("revealObjects", (function () {

        function Tween() {
            this.object = null;
            this.translate1 = vec3.create();
            this.translate2 = vec3.create();
            this.opacity = 1.0;
            this.shown = true;
        }

        Tween.prototype.init = function (object, translate) {
            this.object = object;
            if (object.translate) {
                this.translate1[0] = object.translate.x;
                this.translate1[1] = object.translate.y;
                this.translate1[2] = object.translate.z;
            }
            vec3.add(this.translate2, this.translate1, translate);
            this.opacity = 1.0;
            this.shown = object.shown;
        };

        Tween.prototype.update = (function () {
            var t = vec3.create();
            return function (f) {
                Human.math.lerpVec3(f, 0, 1, this.translate1, this.translate2, t);
                this.object.setTransform({translate: {x: t[0], y: t[1], z: t[2]}});
                var opacity = (1 - f) * this.opacity;
                this.object.setOpacity(opacity);
                this.object.show(opacity !== 0);
            };
        })();

        Tween.prototype.reset = function () {
            this.object.setTransform({
                translate: {
                    x: this.translate1[0],
                    y: this.translate1[1],
                    z: this.translate1[2]
                }
            });
            this.object.setOpacity(this.opacity);
            this.object.show(this.shown);
        };

        var duration = 1000; // Milliseconds
        var tweens = [];
        var numTweens = 0;
        var restored = 0;
        var revealing = 1;
        var revealed = 2;
        var restoring = 3;
        var state = restored;
        var startTime;
        var done;

        Human.events.on("tick", function () {
            if (state === restored || state === revealed) {
                return;
            }
            var f = (Date.now() - startTime) / duration;
            if (state === restoring) {
                f = 1 - f;
            }
            if (state === revealing && f >= 1) {
                state = revealed;
                f = 1;
            } else if (state === restoring && f <= 0) {
                state = restored;
                f = 0;
            }
            for (var i = 0; i < numTweens; i++) {
                tweens[i].update(f);
            }
            if (done && f === 0 || f === 1) {
                done();
                done = null;
            }
        });

        var selector;
        var pattern;

        return {

            /**
             * Duration in seconds of the reveal effect.
             */
            setDuration: function (value) {
                duration = value || 1000;
            },

            /**
             * Sets a callback to apply to IDs of objects to determine
             * if they remain shown while applying the reveal effect.
             */
            setSelector: function (fn) {
                selector = fn;
            },

            /**
             * Sets a pattern to find in IDs of objects to determine
             * if they remain shown while applying the reveal effect.
             */
            setPattern: function (value) {
                pattern = value;
            },

            /**
             * Reveal objects.
             */
            reveal: (function () {

                var invViewMat = mat4.create();
                var tempVec3 = vec3.create();
                var eyeLook = vec3.create();
                var normEyeLook = vec3.create();
                var worldVec = vec3.create();

                return function (params, _done) {
                    if (state !== restored) {
                        if (_done) {
                            _done();
                        }
                        return;
                    }
                    var translate;

                    if (params.worldVec) {
                        translate = params.worldVec;

                    } else if (params.viewVec) {
                        var viewMat = Human.renderer.getViewMat();
                        mat4.invert(invViewMat, viewMat);
                        translate = vec3.transformMat4(tempVec3, params.viewVec, invViewMat);

                    } else {
                        var eye = Human.view.camera.eye;
                        var look = Human.view.camera.look;
                        eyeLook[0] = look.x - eye.x;
                        eyeLook[1] = look.y - eye.y;
                        eyeLook[2] = look.z - eye.z;
                        vec3.normalize(normEyeLook, eyeLook);
                        translate = vec3.scale(worldVec, normEyeLook, params.dist || 100);
                    }

                    var whitelist = {};

                    if (params.objectIds) {
                        var objectIds = params.objectIds;
                        var objectId;
                        var object;
                        for (var i = 0; i < objectIds.length; i++) {
                            objectId = objectIds[i];
                            object = Human.scene.objects[objectId];
                            if (object && object.isLeaf()) {
                                whitelist[objectId] = true;
                            }
                        }
                    }

                    var sceneObjects = Human.scene.enabledObjects; // Don't waste tweens on invisible objects
                    var tween;
                    numTweens = 0;
                    for (objectId in sceneObjects) {
                        if (sceneObjects.hasOwnProperty(objectId)) {
                            if (pattern && (objectId.search(pattern) !== -1)) {
                                continue;
                            }
                            if (selector && selector(objectId)) {
                                continue;
                            }
                            if (whitelist && whitelist[objectId]) {
                                continue;
                            }
                            object = sceneObjects[objectId];
                            if (object.isLeaf()) {
                                tween = tweens[numTweens];
                                if (!tween) {
                                    tween = new Tween();
                                    tweens[numTweens] = tween;
                                }
                                tween.init(object, translate);
                                numTweens++;
                            }
                        }
                    }
                    done = _done;
                    state = revealing;
                    startTime = Date.now();
                };
            })(),

            /**
             * Restore objects that were stripped away by #reveal.
             */
            restore: function restore(_done) {
                if (state !== revealed) {
                    if (_done) {
                        _done();
                    }
                    return;
                }
                done = _done;
                state = restoring;
                startTime = Date.now();
            },

            /**
             * Reset objects to original states.
             */
            reset: function () {
                for (var i = 0; i < numTweens; i++) {
                    tweens[i].reset();
                }
                numTweens = 0;
                var callback = done && (state === restoring || state === revealing);
                state = restored;
                if (callback) {
                    done();
                    done = null;
                }
            }
        };
    })());

})();
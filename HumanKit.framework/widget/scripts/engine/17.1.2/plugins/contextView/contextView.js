/**
 * Parses binary geometry assets into constructor args for SceneJS.Geometry.
 *
 * @constructor
 */
var GeometryAssetParser = function () {

    "use strict";

    var INDEX_TYPE_MAP = {
        "1": Uint8Array,
        "2": Uint16Array,
        "4": Uint32Array
    };

    /**
     * Asset in, geometry constructor args out.
     * @param asset
     * @returns {{geometry: {primitive: string}, compressed: boolean}}
     */
    this.parseAsset = function (asset) {
        var fileType = new Uint32Array(asset, 0, 1)[0];
        var cfg = {
            geometry: {
                type: "geometry",
                primitive: "triangles"
            },
            compressed: (fileType !== 0x11)
        };
        if (!cfg.compressed) {
            parseRawGeometry(asset, cfg);
        } else {
            parseCompressedGeometry(asset, cfg);
        }
        return cfg;
    };

    function parseRawGeometry(asset, cfg) {

        /*
         Geometry format

         bytes   : info
         [0.. 3]: uint32; file type identifer (= 0x11)
         [4.. 7]: uint32; byte-length of padded asset id
         [8..11]: uint32; byte-length of padded morph keys JSON
         [12..15]: uint32; byte-length of positions array
         [16..19]: uint32; byte-length of normals array
         [20..23]: uint32; byte-length of indices array
         [24..27]: uint32; byte-length of uv array
         [28..43]: unit32[4]; unused, reserved for future use
         [  ..  ]: text; asset id (tail-padded with empty spaces, e.g. 0x20)
         [  ..  ]: text; morph key JSON (tail-padded with 0x20)
         [  ..  ]: float32[]; positions array
         [  ..  ]: float32[]; normals array
         [  ..  ]: int32[];   indices array
         [  ..  ]: float32[]; uv array
         */

        var index = new Uint32Array(asset, 0, 11);

        var assetIdSize = index[1];
        var keysSize = index[2];
        var positionsSize = index[3];
        var normalsSize = index[4];
        var indicesSize = index[5];
        var uvsSize = index[6];
        // var unused = index[7 ... 10];

        var assetIdStart = 11 * Uint32Array.BYTES_PER_ELEMENT;
        var keysStart = assetIdStart + assetIdSize;
        var positionsStart = keysStart + keysSize;
        var normalsStart = positionsStart + positionsSize;
        var indicesStart = normalsStart + normalsSize;
        var uvsStart = indicesStart + indicesSize;

        var numVertices = 0;

        if (positionsSize > 0) {
            cfg.geometry.positions = new Float32Array(asset, positionsStart, positionsSize / Float32Array.BYTES_PER_ELEMENT);
            cfg.boundary = getBoundary(cfg.geometry.positions);
            numVertices = cfg.geometry.positions.length / 3;
        }

        if (normalsSize > 0) {
            cfg.geometry.normals = new Float32Array(asset, normalsStart, normalsSize / Float32Array.BYTES_PER_ELEMENT);
        }

        if (uvsSize > 0) {
            cfg.geometry.uv = new Float32Array(asset, uvsStart, uvsSize / Float32Array.BYTES_PER_ELEMENT);
        }

        if (indicesSize > 0) {
            cfg.geometry.indices = new Uint32Array(asset, indicesStart, indicesSize / Uint32Array.BYTES_PER_ELEMENT);
            if (numVertices <= 256) {
                cfg.geometry.indices = new Uint8Array(cfg.geometry.indices);
            } else if (numVertices <= 65536) {
                cfg.geometry.indices = new Uint16Array(cfg.geometry.indices);
            }
        }
    }

    var positionScaleMat = mat4.create();
    var positionTranslateMat = mat4.create();
    var uvScaleMat = mat3.create();
    var uvTranslateMat = mat3.create();

    function parseCompressedGeometry(asset, cfg) {
        /*
         # HEADER
         [0.. 3]: uint32; file type identifier (= 0x12)
         [4.. 7]: uint32; byte-length of padded asset id
         [8..11]: uint32; byte-length of padded morph JSON
         [12..15]: uint32; data segment offset (e.g. where DATA starts)
         [16..19]: uint32; indices offset
         [20..23]: uint32; byte-length of positions array
         [24..27]: uint32; byte-length of normals array
         [28..31]: uint32; byte-length of indices array
         [32]: uchar; byte-length of positions matrix elements (= 24)
         [33]: uchar; size (bytes) of indices type (e.g. 1, 2, 4)
         [34]: uchar; # of uv sets
         [35]: unused
         (36..39): uint32; byte-length of array for uv set 1
         ... repeat for uvs
         (  ..  ): uint32; byte-length of array for uv set n
         (  ): uchar; byte-length of uv set 1 matrix elements (= 16)
         ... repeat for uvs
         (  ): uchar; byte-length of uv set n matrix elements (= 16)
         (  ..  ): padding to align DATA to uint32; "unused" is obviated by data offset

         # DATA
         [  ..  ]: quad-char[]/text; asset id (tail-padded with empty spaces, e.g. 0x20)
         [  ..  ]: quad-char[]/text; morph JSON (tail-padded; includes extra info)
         [  ..  ]: float32[]; positions matrix elements
         (  ..  ): float32[]; uv set 1 matrix elements
         ... repeat for uvs
         (  ..  ): float32[]; uv set n matrix elements
         [  ..  ]: uint16[]; quantized positions array
         (  ..  ): uint16[]; quantized uv set 1 array
         ... repeat for uvs
         (  ..  ): uint16[]; quantized uv set n array
         (  ..  ): signed char[]; oct-encoded normals array
         (  ..  ): padding to align indices to uint32, which will work for all sizes
         (  ..  ): indices_t[]; indices array
         */

        var index = new DataView(asset);

        var assetIdSize = index.getUint32(4, true);
        var morphDataSize = index.getUint32(8, true);
        var dataOffset = index.getUint32(12, true);
        var indexOffset = index.getUint32(16, true);
        var positionsSize = index.getUint32(20, true);
        var normalsSize = index.getUint32(24, true);
        var indicesSize = index.getUint32(28, true);
        var positionDecodeSize = index.getUint16(32, true);
        var indexType = index.getUint8(34);
        var uvCount = index.getUint8(35);

        var uvIndex = new Array(uvCount);

        var bytePos, i;

        for (i = 0, bytePos = 36; i < uvCount; i++, bytePos += 6) {
            uvIndex[i] = {
                uvSize: index.getUint32(bytePos, true),
                uvDecodeSize: index.getUint16(bytePos + 4, true)
            };
        }

        // Start at position transform data
        bytePos = dataOffset + assetIdSize + morphDataSize;

        if (positionDecodeSize > 0) {
            cfg.positionTranslate = new Float32Array(asset, bytePos, 3);
            cfg.positionScale = new Float32Array(asset, bytePos + 12, 3);

            mat4.fromScaling(positionScaleMat, cfg.positionScale);
            mat4.fromTranslation(positionTranslateMat, cfg.positionTranslate);
            cfg.geometry.positionDecodeMat = mat4.create();

            mat4.multiply(cfg.geometry.positionDecodeMat, positionTranslateMat, positionScaleMat);

            bytePos += positionDecodeSize;
        }

        if (uvCount > 0) {
            cfg.geometry.uvDecodeMats = new Array(uvCount);
            cfg.uvTranslates = new Array(uvCount);
            cfg.uvScales = new Array(uvCount);

            for (i = 0; i < uvCount; i++) {
                var uvTranslate = cfg.uvTranslates[i] = new Float32Array(asset, bytePos, 2);
                var uvScale = cfg.uvScales[i] = new Float32Array(asset, bytePos + 8, 2);

                mat3.fromScaling(uvScaleMat, uvScale);
                mat3.fromTranslation(uvTranslateMat, uvTranslate);
                cfg.geometry.uvDecodeMats[i] = mat3.create();

                mat3.multiply(cfg.geometry.uvDecodeMats[i], uvTranslateMat, uvScaleMat);

                bytePos += uvIndex[i].uvDecodeSize;
            }
        }

        if (positionsSize > 0) {
            cfg.geometry.positions = new Uint16Array(asset, bytePos, positionsSize / Uint16Array.BYTES_PER_ELEMENT);
            cfg.boundary = getBoundary(cfg.geometry.positions, cfg.positionScale, cfg.positionTranslate);

            bytePos += positionsSize;
        }

        if (uvCount > 0) {
            cfg.geometry.uvs = new Array(uvCount);

            for (i = 0; i < uvCount; i++) {
                cfg.geometry.uvs[i] = new Uint16Array(asset, bytePos, uvIndex[i].uvSize / Uint16Array.BYTES_PER_ELEMENT);
                bytePos += uvIndex[i].uvSize;
            }
        }

        if (normalsSize > 0) {
            cfg.geometry.normals = new Int8Array(asset, bytePos, normalsSize / Int8Array.BYTES_PER_ELEMENT);
            bytePos += normalsSize;
        }

        if (indicesSize > 0) {
            var IndexType = INDEX_TYPE_MAP[indexType];
            cfg.geometry.indices = new IndexType(asset, indexOffset, indicesSize / IndexType.BYTES_PER_ELEMENT);
        }
    }

    var defaultTranslate = vec3.fromValues(0, 0, 0);
    var defaultScale = vec3.fromValues(1, 1, 1);

    // Get minimal boundary enclosing the given array
    function getBoundary(positions, scale, translate) {
        scale = scale || defaultScale;
        translate = translate || defaultTranslate;
        var xmin = 100000;
        var ymin = 100000;
        var zmin = 100000;
        var xmax = -100000;
        var ymax = -100000;
        var zmax = -100000;
        var x, y, z;
        for (var i = 0, len = positions.length - 2; i < len; i += 3) {
            x = positions[i] * scale[0] + translate[0];
            y = positions[i + 1] * scale[1] + translate[1];
            z = positions[i + 2] * scale[2] + translate[2];

            if (x < xmin) {
                xmin = x;
            }
            if (y < ymin) {
                ymin = y;
            }
            if (z < zmin) {
                zmin = z;
            }
            if (x > xmax) {
                xmax = x;
            }
            if (y > ymax) {
                ymax = y;
            }
            if (z > zmax) {
                zmax = z;
            }
        }
        return {xmin: xmin, ymin: ymin, zmin: zmin, xmax: xmax, ymax: ymax, zmax: zmax};
    }

};

/**
 Plugin which shows a context View at the bottom right corner of the canvas.

 Usage:

 var contextView = Human.plugins.contextView;

 contextView.setGeometry([
 "mini_human_skin/geometry.upper_bodyShape",
 "mini_human_skin/geometry.right_legShape",
 "mini_human_skin/geometry.left_legShape",
 "mini_human_skin/geometry.bike_shortsShape"
 ]);

 contextView.show(); // ContextView is initially hidden, so we need to show it

 contextView.hide();

 // Switch to differeent geometry

 contextView.setGeometry([
 "mini_human_skin2/geometry.upper_bodyShape",
 "mini_human_skin2/geometry.right_legShape",
 "mini_human_skin2/geometry.left_legShape",
 "mini_human_skin2/geometry.bike_shortsShape"
 ]);


 */
(function () {

    "use strict";

    //------------------------------------------------------------------------------
    // contextView plugin
    //------------------------------------------------------------------------------

    var contextView = new (function () {

        var css = "canvas.contextViewPluginCanvas {\
            position: absolute;\
            border-radius: 6px;\
            padding: 0;\
            margin: 0;\
            background: rgba(204,204,204,.75);\
            -moz-user-select: -moz-none;\
            -khtml-user-select: none;\
            -webkit-user-select: none;\
            -ms-user-select: none;\
            user-select: none;\
            left: auto;\
            top: auto;\
            right: 0;\
            bottom: 15px;\
        }\
        div.contextViewPluginBox {\
            position: absolute;\
            padding: 0;\
            margin: 0;\
            background: rgba(44,56,73,.25);\
            z-index: inherit;\
            -moz-user-select: -moz-none;\
            -khtml-user-select: none;\
            -webkit-user-select: none;\
            -ms-user-select: none;\
            user-select: none;\
            pointer-events: none;\
            visibility: hidden;\
        };" ;

        var camera = Human.renderer.camera;
        var shown = false;
        var size = [120, 200];
        var contextCanvas = null;
        var frameBox = null;
        var scene = null;
        var contentRoot = null;
        var assetParser = new GeometryAssetParser();
        var contextBoundary = {
            xmin: 100000, ymin: 100000, zmin: 100000,
            xmax: -100000, ymax: -100000, zmax: -100000
        };

        var contextCenter = vec3.create();
        var frameBoxEnabled = true;

        this.show = function () {
            if (shown) {
                return;
            }
            if (contextCanvas) {
                contextCanvas.style.visibility = "visible";
            }
            shown = true;
        };

        this.hide = function () {
            if (!shown) {
                return;
            }
            if (contextCanvas) {
                contextCanvas.style.visibility = "hidden";
            }
            this.disableFrameBox();
            shown = false;
        };

        this.enableFrameBox = function() {
            if (!shown) {
                return;
            }
            frameBoxEnabled = true;
            if (contextCanvas) {
                frameBox.style.visibility = "visible";
                this.synchContextViewCamera();
            }
        };

        this.disableFrameBox = function() {
            frameBoxEnabled = false;
            if (contextCanvas) {
                frameBox.style.visibility = "hidden";
                this.synchContextViewCamera();
            }
        };

        this.getShown = function () {
            return shown;
        };

        this.setSize = function (value) {
            value = value || [300, 300];
            if (contextCanvas) {
                contextCanvas.style.width = value[0] + "px";
                contextCanvas.style.height = value[1] + "px";
            }

            if (scene) {
                scene.setProjection({
                    type: "perspective",
                    aspect: value[0] / value[1],
                });
            }
            size = value;
        };

        this.getSize = function () {
            return size;
        };

        this.setGeometry = function (assetIds, ok) {

            // Lazy-create the context view the first time we set its geometry

            createContextView();

            // Fit context boundary to the geometries

            contextBoundary.xmin = 100000;
            contextBoundary.ymin = 100000;
            contextBoundary.zmin = 100000;
            contextBoundary.xmax = -100000;
            contextBoundary.ymax = -100000;
            contextBoundary.zmax = -100000;

            var numAssets = assetIds.length;

            for (var i = 0, len = assetIds.length; i < len; i++) {
                Human.assets.server.getAsset("geometry", assetIds[i], gotAsset);
            }

            function gotAsset(asset) {
                var cfg = assetParser.parseAsset(asset);
                contentRoot.removeNodes();
                contentRoot.addNode(cfg.geometry);
                var assetBoundary = cfg.boundary;
                if (assetBoundary.xmin < contextBoundary.xmin) {
                    contextBoundary.xmin = assetBoundary.xmin;
                }
                if (assetBoundary.ymin < contextBoundary.ymin) {
                    contextBoundary.ymin = assetBoundary.ymin;
                }
                if (assetBoundary.zmin < contextBoundary.zmin) {
                    contextBoundary.zmin = assetBoundary.zmin;
                }
                if (assetBoundary.xmax > contextBoundary.xmax) {
                    contextBoundary.xmax = assetBoundary.xmax;
                }
                if (assetBoundary.ymax > contextBoundary.ymax) {
                    contextBoundary.ymax = assetBoundary.ymax;
                }
                if (assetBoundary.zmax > contextBoundary.zmax) {
                    contextBoundary.zmax = assetBoundary.zmax;
                }

                if (--numAssets === 0) {
                    contextCenter[0] = (contextBoundary.xmin + contextBoundary.xmax) * 0.5;
                    contextCenter[1] = (contextBoundary.ymin + contextBoundary.ymax) * 0.5;
                    contextCenter[2] = (contextBoundary.zmin + contextBoundary.zmax) * 0.5;

                    contextView.synchContextViewCamera();
                }
            }
        };

        function createContextView() {

            if (contextCanvas) {
                return;
            }

            var humanCanvas = Human.renderer.canvas.annotationCanvas;

            // Insert context view style
            var head = document.head || document.getElementsByTagName('head')[0];
            var styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css;
            } else {
                styleElement.appendChild(document.createTextNode(css));
            }
            head.insertBefore(styleElement, head.children[0]);

            // Create context view canvas and frame box

            var style;

            contextCanvas = document.createElement('canvas');
            contextCanvas.id = "contextViewPluginCanvas";
            contextCanvas.classList.add('contextViewPluginCanvas');
            style = contextCanvas.style;
            style.width = size[0] + "px";
            style.height = size[1] + "px";
            style.visibility = shown ? "visible" : "hidden";
            humanCanvas.parentElement.appendChild(contextCanvas);

            frameBox = document.createElement('div');
            frameBox.id = "contextViewPluginBox";
            frameBox.classList.add('contextViewPluginBox');
            style = frameBox.style;
            style.width = 0;
            style.height = 0;
            style.visibility = "hidden";
            humanCanvas.parentElement.appendChild(frameBox);

            contextCanvas.oncontextmenu = function (e) {
                e.preventDefault();
            };

            // Create context view SceneJS scene

            scene = SceneJS.createScene({
                canvasId: contextCanvas.id,
                transparent: true,
                nodes: [
                    {
                        type: "material",
                        id: "theContentRoot",
                        color: {r: 0.6, g: 0.6, b: 0.6}
                    }
                ]
            });

            scene.setCamera({ 
                eye: [0, 90, -180],
                look: [0, 90, 0],
                up: [0,1,0] 
            });

            scene.setProjection({
                type: "perspective",
                fovy: 60.0,
                aspect: size[0] / size[1],
                near: 1,
                far: 500.0
            });

            requestAnimationFrame(function draw() {
                requestAnimationFrame(draw);
                scene.render();
            });

            contentRoot = scene.getNode("theContentRoot");

            // Transforms a World-space position from one boundary to another
            // Used to map World-space coordinates between model boundaries
            // of Human and context view.

            function mapWorldPos(a, b, p1, p2) {

                var aXSize = a.xmax - a.xmin;
                var aYSize = a.ymax - a.ymin;
                var aZSize = a.zmax - a.zmin;

                var bXSize = b.xmax - b.xmin;
                var bYSize = b.ymax - b.ymin;
                var bZSize = b.zmax - b.zmin;

                p2[0] = b.xmin + ((p1[0] - a.xmin) * (bXSize / aXSize));
                p2[1] = b.ymin + ((p1[1] - a.ymin) * (bYSize / aYSize));
                p2[2] = b.zmin + ((p1[2] - a.zmin) * (bZSize / aZSize));
            }

            // When user updates the Human camera, synchronize the orientation
            // of the context view camera and update the context view frame box

            var synchContextViewCamera = contextView.synchContextViewCamera = (function () {

                var DEGTORAD = 0.0174532925;

                var humanEye = new Float32Array(4);
                var humanLook = new Float32Array(4);
                var humanUp = new Float32Array(3);
                var humanEyeVec = new Float32Array(3);
                var contextEyeOffset = new Float32Array(3);
                var rayDir = new Float32Array(3);
                var hitPos = new Float32Array(3);
                var contextTarget = new Float32Array(3);
                var rayResult = new Float32Array(2);

                var contextTarget = new Float32Array(4);
                var contextTargetView = new Float32Array(4);
                var contextTargetCanvas = new Float32Array(2);

                var contextEye = new Float32Array(4);
                var contextEyeView = new Float32Array(4);
                var contextEyeTargetVec = new Float32Array(3);

                var contextViewSliceMin = new Float32Array(4);
                var contextViewSliceMax = new Float32Array(4);

                var contextCanvasSliceMin = new Float32Array(2);
                var contextCanvasSliceMax = new Float32Array(2);

                var boundaryMin = new Float32Array(3);
                var boundaryMax = new Float32Array(3);

                // World-to-view transform in context view

                function contextWorldToView(worldPos, viewPos) {
                    var viewMat = scene.getViewMatrix();
                    vec3.transformMat4(viewPos, worldPos, viewMat);
                    viewPos[3] = 1; // Need homogeneous 'w' for perspective division
                }

                // View-to-canvas projection in context view

                var contextViewToCanvas = (function () {
                    var pos = vec4.create();
                    return function (viewPos, canvasPos) {
                        var projMat = scene.getProjectionMatrix();
                        var canvasWidth = contextCanvas.width;
                        var canvasHeight = contextCanvas.height;
                        vec4.transformMat4(pos, viewPos, projMat);
                        var x = pos[0];
                        var y = pos[1];
                        var w = pos[3];
                        canvasPos[0] = (1 + x / w) * canvasWidth / 2;
                        canvasPos[1] = (1 - y / w) * canvasHeight / 2;
                    };
                })();

                return function () {

                    var eye = camera.eye;
                    var look = camera.look;
                    var up = camera.up;
                    var aspect = humanCanvas.height / humanCanvas.width;

                    var fov = scene.getProjection().fov;

                    humanEye[0] = eye.x;
                    humanEye[1] = eye.y;
                    humanEye[2] = eye.z;
                    humanEye[3] = 1;

                    humanLook[0] = look.x;
                    humanLook[1] = look.y;
                    humanLook[2] = look.z;
                    humanLook[3] = 1;

                    humanUp[0] = up.x;
                    humanUp[1] = up.y;
                    humanUp[2] = up.z;

                    vec3.subtract(humanEyeVec, humanEye, humanLook);
                    contextEyeOffset.set(humanEyeVec);
                    contextEyeOffset[1] = 0;
                    vec3.normalize(contextEyeOffset, contextEyeOffset);

                    var diag = Human.math.getBoundaryDiag(contextBoundary);
                    var sca = Math.abs((diag) / Math.tan(45 * DEGTORAD));

                    scene.setCamera({
                        eye:[contextCenter[0] + (contextEyeOffset[0] * sca),contextCenter[1] + (contextEyeOffset[1] * sca),contextCenter[2] + (contextEyeOffset[2] * sca)],
                        look:contextCenter,
                        up:[0,1,0]
                    });

                    if (frameBoxEnabled) {

                        var humanBoundary = Human.scene.getBoundary();

                        vec3.normalize(rayDir, humanEyeVec);
                        vec3.scale(rayDir, rayDir, -1);

                        // Try to hit a kdTree node first.
                        var rayResults = Human.math.intersections.raySceneAabb(humanEye, rayDir, function(object) {
                            return object.shown;
                        }, function(renderable) {
                            return !renderable.isTransparent();
                        });

                        var targetDistance;
                        if (rayResults) {

                            var result = rayResults[0];
                            var boundary = result.object.getBoundary();

                            boundaryMin[0] = boundary.xmin;
                            boundaryMin[1] = boundary.ymin;
                            boundaryMin[2] = boundary.zmin;

                            boundaryMax[0] = boundary.xmax;
                            boundaryMax[1] = boundary.ymax;
                            boundaryMax[2] = boundary.zmax;

                            vec3.scale(rayDir, rayDir, result.tmin);
                            vec3.add(hitPos, humanEye, rayDir);
                            mapWorldPos(humanBoundary, contextBoundary, hitPos, contextTarget);
                            targetDistance = result.tmin;
                        } else {
                            boundaryMin[0] = humanBoundary.xmin;
                            boundaryMin[1] = humanBoundary.ymin;
                            boundaryMin[2] = humanBoundary.zmin;

                            boundaryMax[0] = humanBoundary.xmax;
                            boundaryMax[1] = humanBoundary.ymax;
                            boundaryMax[2] = humanBoundary.zmax;

                            if (Human.math.intersections.pointAabb(humanEye, boundaryMin, boundaryMax)) {
                                // If the eye is in the scene AABB just follow it.
                                contextTarget.set(humanEye);
                                targetDistance = scene.getProjection().near;
                            } else if (Human.math.intersections.rayAabb(humanEye, rayDir, boundaryMin, boundaryMax, rayResult)) {
                                // Try to hit the scene AABB and follow point of intersection
                                vec3.scale(rayDir, rayDir, rayResult[0]);
                                vec3.add(hitPos, humanEye, rayDir);
                                mapWorldPos(humanBoundary, contextBoundary, hitPos, contextTarget);
                                targetDistance = rayResult[0];
                            } else {
                                // Else just follow lookAt.
                                mapWorldPos(humanBoundary, contextBoundary, humanEye, contextEye);
                                mapWorldPos(humanBoundary, contextBoundary, humanLook, contextTarget);
                                vec3.subtract(contextEyeOffset, contextTarget, contextEye);
                                targetDistance = vec3.length(contextEyeOffset);
                            }
                        }

                        contextWorldToView(contextTarget, contextTargetView);
                        contextViewToCanvas(contextTargetView, contextTargetCanvas);

                        var frustumHeight = 2.0 * targetDistance * Math.tan(fov * 0.5 * DEGTORAD);
                        var frustumWidth = frustumHeight / aspect;
                        var halfFrustumHeight = frustumHeight * 0.5;
                        var halfFrustumWidth = frustumWidth * 0.5;
                        var halfFrustumDim = Math.min(halfFrustumWidth, halfFrustumHeight);

                        contextViewSliceMin[0] = contextTargetView[0] - halfFrustumDim;
                        contextViewSliceMin[1] = contextTargetView[1] + halfFrustumDim;
                        contextViewSliceMin[2] = contextTargetView[2];
                        contextViewSliceMin[3] = 1;

                        contextViewToCanvas(contextViewSliceMin, contextCanvasSliceMin);

                        contextViewSliceMax[0] = contextTargetView[0] + halfFrustumDim;
                        contextViewSliceMax[1] = contextTargetView[1] - halfFrustumDim;
                        contextViewSliceMax[2] = contextTargetView[2];
                        contextViewSliceMax[3] = 1;

                        contextViewToCanvas(contextViewSliceMax, contextCanvasSliceMax);

                        var elementLeft = contextCanvas.offsetLeft + contextCanvas.clientLeft;
                        var elementTop = contextCanvas.offsetTop + contextCanvas.clientTop;

                        var left = elementLeft + Math.round(contextCanvasSliceMin[0]);
                        var top = elementTop + Math.round(contextCanvasSliceMin[1]);
                        var dim = Math.round(contextCanvasSliceMax[0] - contextCanvasSliceMin[0]);

                        var maxDim = Math.max(contextCanvas.width, contextCanvas.height);
                        var minDim = Math.min(contextCanvas.width * 0.05, contextCanvas.height * 0.05);

                        if (dim < minDim) {
                            var centerX = left + 0.5 * dim;
                            var centerY = top + 0.5 * dim;

                            dim = minDim;
                            left = centerX - 0.5 * dim;
                            top = centerY - 0.5 * dim;
                        }

                        if (dim > maxDim) {
                            frameBox.style.visibility = "hidden";
                            return;
                        } else {
                            frameBox.style.visibility = "visible";
                        }

                        // Clip frame box extents to context canvas

                        if (left < elementLeft) {
                            left = elementLeft;
                        }

                        if (top < elementTop) {
                            top = elementTop;
                        }

                        var right = left + dim;
                        var bottom = top + dim;
                        var rightMax = elementLeft + contextCanvas.clientWidth - 2 * frameBox.clientLeft;

                        if (right > rightMax) {
                            right = rightMax;
                        }

                        var bottomMax = elementTop + contextCanvas.clientHeight - 2 * frameBox.clientTop;

                        if (bottom > bottomMax) {
                            bottom = bottomMax;
                        }

                        var width = right - left;
                        var height = bottom - top;

                        // Update frame box CSS

                        var style = frameBox.style;
                        style.left = "" + left + "px";
                        style.top = "" + top + "px";
                        style.width = width + "px";
                        style.height = height + "px";
                    } else {
                        frameBox.style.visibility = "hidden";
                    }
                };
            })();

            Human.events.on("camera.updated", synchContextViewCamera);
            Human.events.on("canvas.resized", synchContextViewCamera);

            // When clicking on context view, raypick to get world pos, fly Human camera to look
            // at that pos (after mapping pos between context view and Human boundaries).

            (function () {

                var downX;
                var downY;
                var eye = vec3.create();
                var look = vec3.create();
                var eyeVec = vec3.create();
                var humanWorldPos = vec3.create();

                var INV_TAN_45 = 1 / Math.tan(Math.PI / 4);

                contextCanvas.addEventListener("mousedown", function (e) {
                    if (!shown) {
                        return;
                    }
                    if (e.which !== 1) {// Left button
                        return;
                    }
                    downX = e.clientX;
                    downY = e.clientY;
                });

                contextCanvas.addEventListener("mouseup", function (e) {
                    if (!shown) {
                        return;
                    }
                    if (e.which !== 1) {// Left button
                        return;
                    }
                    if (Math.abs(e.clientX - downX) > 3 || Math.abs(e.clientY - downY) > 3) {
                        return;
                    }

                    var canvasPos = getCoordsWithinElement(e);

                    var hit = scene.pick(canvasPos[0], canvasPos[1], {rayPick: true});

                    if (hit) {

                        var math = Human.math;
                        var camera = Human.view.camera;

                        mapWorldPos(contextBoundary, Human.scene.getBoundary(), hit.worldPos, humanWorldPos);

                        eye[0] = camera.eye.x;
                        eye[1] = camera.eye.y;
                        eye[2] = camera.eye.z;

                        look[0] = camera.look.x;
                        look[1] = camera.look.y;
                        look[2] = camera.look.z;

                        vec3.subtract(eyeVec, eye, look);
                        vec3.normalize(eyeVec, eyeVec);

                        var diag = Human.math.getBoundaryDiag(contextBoundary);
                        var sca = Math.abs(diag * INV_TAN_45) * 0.25;

                        Human.view.camera.fly.flyTo({
                            eye: {
                                x: humanWorldPos[0] + (eyeVec[0] * sca),
                                y: humanWorldPos[1] + (eyeVec[1] * sca),
                                z: humanWorldPos[2] + (eyeVec[2] * sca)
                            },
                            look: {
                                x: humanWorldPos[0],
                                y: humanWorldPos[1],
                                z: humanWorldPos[2]
                            }
                        });

                    }
                });

                function getCoordsWithinElement(event) {
                    var coords = [0, 0];
                    if (!event) {
                        event = window.event;
                        coords.x = event.x;
                        coords.y = event.y;
                    } else {
                        var element = event.target;
                        var totalOffsetLeft = 0;
                        var totalOffsetTop = 0;

                        while (element) {
                            totalOffsetLeft += element.offsetLeft + element.clientLeft;
                            totalOffsetTop += element.offsetTop + element.clientTop;
                            element = element.offsetParent;
                        }
                        coords[0] = event.pageX - totalOffsetLeft;
                        coords[1] = event.pageY - totalOffsetTop;
                    }

                    // console.log(coords.join(", "));
                    return coords;
                }
            })();
        }
    })();

    Human.addPlugin("contextView", contextView);

    // Set initial objects
/*
    Human.plugins.contextView.setGeometry([
        "mini_human_skin/geometry.upper_bodyShape",
        "mini_human_skin/geometry.right_legShape",
        "mini_human_skin/geometry.left_legShape",
        "mini_human_skin/geometry.bike_shortsShape"
    ]);

    Human.plugins.contextView.show();
*/
})();

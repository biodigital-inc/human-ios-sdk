/**
 Plugin which allows scene objects to be moved around.

 Usage:

 var objectMoveTool = Human.plugins.objectMoveTool;

 // Move the Frontal bone to the right and then upwards:

 objectMoveTool.moveObject("femaleAdult_standard-Frontal_bone_52734_ID", [10, 0, 0]);
 objectMoveTool.moveObject("femaleAdult_standard-Frontal_bone_52734_ID", [0, 10, 0]);

 // Restore the Frontal bone:

 objectModeTool.restoreObject("femaleAdult_standard-Frontal_bone_52734_ID");
 */
(function () {

    "use strict";

    //------------------------------------------------------------------------------------
    // Plugin
    //------------------------------------------------------------------------------------

    function translateObject(object, translate) {
        object.setTransform({translate: {x: translate[0], y: translate[1], z: translate[2]}});
    }

    var movingObjects = {};

    Human.events.on("scene.objectDestroyed", function (e) {
        if (movingObjects[e.objectId]) {
            delete movingObjects[e.objectId];
        }
    });

    var objectMoveTool = {

        /**
         * Moves an object.
         * @param objectId
         * @param offset
         */
        moveObject: function (objectId, offset) {
            var target = movingObjects[objectId];
            if (!target) {
                var object = Human.scene.objects[objectId];
                if (!object) {
                    console.error("Scene object not found: '" + objectId + "'");
                    return;
                }
                target = movingObjects[object.objectId];
                if (!target) {

                    var translate;

                    if (object.translate) {
                        translate = [
                            object.translate.x,
                            object.translate.y,
                            object.translate.z
                        ];
                    } else {
                        translate = [0, 0, 0];
                    }

                    target = movingObjects[object.objectId] = {
                        object: object,
                        saveTranslate: vec3.clone(translate),
                        translate: vec3.clone(translate)
                    };
                }
            }

            var worldToObject = target.object.getWorldToObjectMatrix();
            vec3.transformMat4(offset, offset, worldToObject);

            target.translate[0] += offset[0];
            target.translate[1] += offset[1];
            target.translate[2] += offset[2];

            translateObject(target.object, target.translate);
        },

        /**
         * Undoes movement of an object.
         * @param objectId
         */
        restoreObject: function (objectId) {
            var target = movingObjects[objectId];
            if (!target) {
                return;
            }
            translateObject(target.object, target.saveTranslate);
            delete movingObjects[objectId];
        },

        /**
         * Undoes movement of all objects.
         */
        restore: function () {
            var target;
            for (var objectId in movingObjects) {
                if (movingObjects.hasOwnProperty(objectId)) {
                    target = movingObjects[objectId];
                    translateObject(target.object, target.saveTranslate);
                }
            }
            movingObjects = {}
        }
    };

    Human.addPlugin("objectMoveTool", objectMoveTool);

})();

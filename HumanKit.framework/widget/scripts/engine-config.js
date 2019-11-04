'use strict';

window.engineConfig = function (ok) {
  var Human = window.Human;

  if (parent.localBaseDirectory) {
    window.localBaseDirectory = parent.localBaseDirectory;
    window.localContentOnly = true;
  } else {
    window.localBaseDirectory = '/';
    window.localContentOnly = false;
  }

  window.HumanBackground.engineProperties.white.xray.color = [0.2, 0.2, 0.3];

  // ANNOTATIONS
  Human.events.on('pick.picked', function (params) {
    if(params.objectId && params.mouseDownRight) {
      var objects = {};
      objects[params.objectId] = true;

      Human.view.annotations.setLabelsShown({ objects: objects });
    }
  });

  if (Human.view.annotations.setResponsiveEnabled) {
    var annotationCollapse = window.HumanWidget.params['annotation-collapse'];

    if (annotationCollapse) {
      annotationCollapse = window.parseInt(annotationCollapse, 10);
    } else {
      annotationCollapse = 501;
    }

    Human.view.annotations.setResponsiveCanvasSizes([[annotationCollapse, 0]]);
    Human.view.annotations.setResponsiveEnabled(true);
  }

  // ACTIONS
  Human.actions.addAction('swapObject', function (params) {
    var objectId = params.objectId;
    var moduleId = params.moduleId;

    Human.modules.activateModules({
      moduleId: moduleId,
      swap: true,
      objectId: objectId
    },
    function () {
      var objects = {};
      objects[objectId] = false;

      Human.scene.setEnabledObjects({
        objects: objects,
        enable: false,
        replace: false
      });

    });
  });

  Human.actions.addAction('unswapObject', function (params) {
    var objectId = params.objectId;
    var moduleId = params.moduleId;
    var activeModules;

    if (objectId) {

      // Form 1. Unswap whatever module was swapped in for the given object
      // Find module that was swapped in for the given object.
      // Linear search, but there will only ever be a very small
      // Number of modules active.
      activeModules = Human.modules.activeModules;

      for (var id in activeModules) {
        if (activeModules.hasOwnProperty(id)) {

          if (activeModules[id].swappedObjectId === objectId) {
            // Found module that was swapped in for given object

            Human.modules.deactivateModules({ moduleId: moduleId });
            showObject(objectId);

            return;
          }
        }
      }
    }

    if (moduleId) {

      // Form 2. Unswap the given swapped-in module
      var module = Human.modules.activeModules[moduleId];

      if (!module || !module.swapped) {
        return;
      }

      Human.modules.deactivateModules({ moduleId: moduleId });

      if (module.swappedObjectId) {
        // Module was swapped for an object, re-show the object
        showObject(objectId);
      }
    }

    // Form 3. Unswap all modules that were swapped in, for any objects.

    activeModules = Human.modules.activeModules;

    for (moduleId in activeModules) {
      if (activeModules.hasOwnProperty(moduleId)) {

        module = activeModules[moduleId];

        if (module.swapped) {
          // Found module that was swapped in
          // Unload the module
          Human.modules.deactivateModules({
            moduleId: moduleId
          });

          if (module.swappedObjectId) {
            // Module was swapped for an object, re-show the object
            showObject(module.swappedObjectId);
          }
        }
      }
    }
  });

  function showObject(objectId) {
    var objects = {};
    objects[objectId] = true;
    Human.scene.setEnabledObjects({
      objects: objects,
      enable: false,
      replace: false
    });
  }

  // [[loadModule?moduleId=foo]]

  Human.actions.addAction('loadModule', function (params) {
    var moduleId = params.moduleId;

    Human.modules.activateModules({ moduleId: moduleId });
  });


  // [[flyToObject?objectId=foo]]

  Human.actions.addAction('flyToObject', function (params) {
    Human.view.camera.fly.flyTo(params);
  });


  // [[flyToPos?eye=0,0,-30&look=0,0,0&up=0,1,0]]

  Human.actions.addAction('flyToPos', function (params) {
    var p = {
      arc: false // Fly straight, don't do the normal 'hop' behaviour
    };

    if (params.eye) {
      p.eye = parseVec3(params.eye, 'eye');
    }

    if (params.look) {
      p.look = parseVec3(params.look, 'look');
    }

    if (params.up) {
      p.up = parseVec3(params.up, 'up');
    }

    Human.view.camera.fly.flyTo(p);
  });


  // [[playChapter?chapterId=foo]]

  Human.actions.addAction('playChapter', function (params) {
    var chapterId = params.chapterId;

    Human.timeline.play({ startChapterId: chapterId });
  });


  // [[flyToAnnotation?annotationId=foo]]

  Human.actions.addAction('flyToAnnotation', function (params) {
    var annotationId = params.annotationId;

    Human.modules.activateModules({ annotationId: annotationId });
  });


  // [[openAnnotations?objectId=foo]]

  Human.actions.addAction('openAnnotations', function (params) {
    Human.view.annotations.setLabelsShown({
      type: params.type || 'secondary',
      shown: true,
      replace: true
    });
  });

  Human.actions.addAction('focusObject', function (params) {
    params.select    = true;
    params.replace   = true;
    params.showLabel = params.showLabel !== 'false';
    params.flyTo     = params.flyTo !== 'false' ? 'newSelected' : 'none';

    Human.view.focus.focusObject(params);
  });

  // Utilities we use in action handlers

  // Parses 3-element vector from a string, ie. '1.2, 2.43, 3.0'
  function parseVec3(str) {
    var tokens = str.split(',');

    try {
      return {
        x: Number.parseFloat(tokens[0]),
        y: Number.parseFloat(tokens[1]),
        z: Number.parseFloat(tokens[2])
      };
    } catch (e) {}
  }

  if(ok) {
    ok();
  }

};

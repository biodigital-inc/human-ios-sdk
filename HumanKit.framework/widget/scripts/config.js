'use strict';

(function (window, angular) {

  var HumanWidget = window.HumanWidget;

  var WIDGET = {

    NAME: 'humanWidget.gary',

    MODULE_DIR: null,

    DEPENDENCIES: {
      'humanWidget': '9.3.2',
      'humanEngine': '17.1.2',
      'humanUI': '15.1.2'
    },

    ENVIRONMENT: window.ENVIRONMENT,

    WEB_GL: {
      device: { ios: true, android: true },
      error: { post: true, log: false, redirect: false }
    },

    EVENTS: {
      // Engine's renderer and websocket have been initialized
      onInit: function () {
        window.engineConfig();

        HumanWidget.activity.initContentInteractive(window.Human);

        if (HumanWidget.data.embedded) {
          HumanWidget.activity.verifyAPI();
        }

        Human.events.once('modules.activate.start', function () {
          HumanWidget.analytics.ga.init({ appName: WIDGET.NAME.split('.')[1] });
        });
      },

      // Content has been loaded
      onReady: function (content) {

        // TODO: Better handling of these events...
        window.setTimeout(function () {
          window.Human.events.fire('app.module.sceneReady');
        }, 1000);

        // UI Lib needs this for now...
        if (content.id) {
          window.Human.events.fire('module.ready', { moduleId: content.id });
        }

        if (Human.mobile && Human.mobile.android) {
          window.HumanKitAndroid.moduleLoaded();
        } else if (Human.mobile && Human.mobile.iOS) {
          window.webkit.messageHandlers.assetsHandler.postMessage('loaded');
        }

        console.log('Battlestation fully operational.');
      },

      // Bookmark or module related loading error
      onError: function () {}
    }

  };

  // By default, the angular app bootstraps after engine is initialized
  angular.module(WIDGET.NAME, ['humanWidget'])

  .config(function (HumanSnapshotProvider) {

    // Mobile Snapshot config
    if (Human.mobile.iOS || Human.mobile.android) {
      HumanSnapshotProvider.config({
        copyrightPosition: {
          x: 'center',
          y: 'bottom'
        },
        copyrightOffset: {
          x: 0,
          y: -50
        }
      });
    }
  })

  .run(function(HumanSnapshot) {
    // Enable snapshot namespace on mobile
    if (Human.mobile.iOS || Human.mobile.android) {
      window.HumanSnapshot = HumanSnapshot;
    }

    HumanSnapshot.config({
      copyrightImagePath: 'img/human-widget-powered-logo.png'
    });

    HumanSnapshot.loadCopyrightImage();
  });

  window.HumanWidget.init(WIDGET);

  window.ENVIRONMENT = undefined; // Remove from window after use

}(window, angular));

/**
 * Plugin which provides a class factory for transition animations.
 *
 * This particular plugin does not actually register itself with the
 * Human plugins system. Instead, it adds itself as the 'Human.transitions' namespace.
 *
 */
(function () {

    "use strict";

    Human.transitions = {};

    var playing = {}; // Transitions that are currently playing

    // Transition abstract base class

    var Transition = function () {
    };

    Transition.prototype = {

        _init: function (cfg) {
            this.id = Human.utils.createUUID();
            this.v1 = cfg.v1;
            this.v2 = cfg.v2;
            this.t = 0;
            this.duration = cfg.duration || 1000.0;
            this.dir = 1;
            this._startTime = null;
            this.finished = cfg.finished;
        },

        enter: function (finished) {
            this.t = 0;
            this.dir = 1;
            this._startTime = null;
            this.finished = finished || this.finished;
            playing[this.id] = this;
        },

        exit: function (finished) {
            this.t = 1;
            this.dir = -1;
            this._startTime = null;
            this.finished = finished || this.finished;
            playing[this.id] = this;
        },

        __update: function (time) {
            var f;
            if (!this._startTime) {
                this._startTime = time;
                f = (this.dir > 0) ? 0 : 1; // Starting factor
            } else {
                var elapsed = time - this._startTime;
                if (elapsed > this.duration) {
                    if (playing[this.id]) {
                        delete playing[this.id];
                        if (this.finished) {
                            this.finished();
                        }
                    }
                    return;
                }
                f = elapsed / this.duration; // f is normalized to [0..1]
                if (this.dir < 0) {
                    f = (1.0 - f);
                }
            }
            //console.log(f);
            this._update(f);
        },

        stop: function () {
            delete playing[this.id];
        },

        destroy: function () {
            this.stop();
        }
    };

    Human.events.on("tick", (function () { // On each tick, update each playing transition.
        return function (e) {
            var time = e.timeNow;
            for (var id in playing) {
                if (playing.hasOwnProperty(id)) {
                    playing[id].__update(time);
                }
            }
        };
    })());

    /**
     * Creates a new Transition subclass.
     * @param update
     * @returns {clazz}
     */
    Human.transitions.newTransitionClass = function(update) {
        var clazz = function (cfg) {
            this._init(cfg);
        };
        Human.utils.extend(clazz, Transition);
        clazz.prototype._update = update;
        return clazz;
    };

    // ----- Bundled transition classes -----------------------------------------

    Human.transitions.CanvasOpacityTransition = Human.transitions.newTransitionClass(function (f) {
        Human.renderer.canvas.canvas[0].style["opacity"] = this.v1 + ((this.v2 - this.v1) * f);
    });

})();
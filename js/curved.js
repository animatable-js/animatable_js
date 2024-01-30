import { Animatable, AnimationController } from "./animation_controller.js";
import { Cubic, Curve } from "./cubic.js";



export class CurvedAnimation extends Animatable {
    /**
     * @param {number} duration 
     * @param {Cubic} curve
     * @param {number} initialValue
     */
    constructor(
        duration,
        curve = Curve.Linear,
        initialValue,
    ) {
        super();
        this.duration = duration;

        /** @type {Cubic} */
        this.curve = curve;
        if (this.curve instanceof Cubic == false) {
            throw "Given argument curve is not of Cubic type.";
        }

        const position = (percent) => {
            const distance = this.end - this.start;
            const movement = distance * percent;

            return this.start + movement;
        }
        
        this.listeners = [];
        this.controller = new AnimationController(duration, initialValue || 0); // Parent.
        this.controller.addListener(value => {
            const vector = this.end - this.start;
            const relValue = (value - this.start) / vector;
            const curved = curve.transform(relValue);

            this.notifyListeners(this.value = position(curved));
        });
    }

    /**
     * Returnes current animation status of parent.
     * @returns {string}
     */
    get status() { return this.controller.status; }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.controller.removeListener(callback);
    }

    addStatusListener(callback) {
        this.controller.addStatusListener(callback);
    }

    removeStatusListener(callback) {
        this.controller.removeListener(callback);
    }

    notifyListeners(value) {
        this.listeners.forEach(listener => listener(value));
    }

    forward () { this.animateTo(1); }
    backward() { this.animateTo(0); }

    /**
     * @param {number} target
     */
    animateTo(target) {
        this.start  = this.value || this.controller.value;
        this.end    = target;
        this.controller.animateTo(target);
    }
}
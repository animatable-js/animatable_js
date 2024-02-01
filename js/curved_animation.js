import { Animatable, AnimationController, AnimationStatus } from "./animation_controller.js";
import { Cubic, Curve } from "./cubic.js";



export class CurvedAnimation extends Animatable {
    /**
     * @param {number} duration 
     * @param {Cubic} curve
     * @param {AnimationController} parent
     */
    constructor(
        duration,
        curve = Curve.Linear,
        parent,
    ) {
        super();
        this.duration = duration;

        /** @type {Cubic} */
        this.curve = curve;
        if (this.curve instanceof Cubic == false) {
            throw new Error("Given argument curve is not of Cubic type.");
        }
        
        if (parent != null && parent instanceof AnimationController) {
            if (parent instanceof AnimationController == false) {
                throw new Error("parent type must be an AnimationController.");
            }
            if (duration != null) {
                throw new Error("Parent is defined, but all setting values must be defined in parent.");
            }
        }
        
        this.listeners = [];
        this.controller = parent || new AnimationController(duration, 0); // Parent.
        this.controller.addListener(value => { // Omit prefix value.
            const relativeVector = this.end - this.rawStart;
            const relative = (value - this.rawStart) / relativeVector;
            
            const curved = curve.transform(relative);
            const absoluteVector = this.end - this.start;
            const absolute = this.start + (absoluteVector * curved);

            this.notifyListeners(this.value = absolute);
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
    repeat() {
        this.addStatusListener(status => {
            if (status == AnimationStatus.FORWARDED) { return this.backward(); }
            if (status == AnimationStatus.BACKWARDED) { return this.forward(); }
        });
        
        this.forward()
    }

    /**
     * For executing an animation towards a specific target given value.
     * @param {number} target
     */
    animateTo(target) {
        this.rawStart = this.controller.value;
        this.start = this.value || this.rawStart;
        this.end   = target;
        this.controller.animateTo(target);
    }
}
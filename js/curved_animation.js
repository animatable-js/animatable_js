import { Animatable, AnimationController, AnimationStatus } from "./animation_controller.js";
import { Cubic, Curve } from "./cubic.js";



export class CurvedAnimation extends Animatable {
    /**
     * @param {AnimationController} parent
     * @param {Cubic} curve
     */
    constructor(
        parent,
        curve = Curve.Ease,
    ) {
        super();
        
        /** @type {Cubic} */
        if (curve instanceof Cubic == false) {
            throw new Error("Given argument curve is not of Cubic type.");
        }
        
        this.listeners = [];
        this.controller = parent;
        this.controller.addListener(_ => {
            if (this.progressValue < 0
             || this.progressValue > 1) {
                console.log(this.progressValue);
            }
            
            const curved = curve.transform(this.progressValue);
            const vector = this.end - this.start;
            const value  = this.start + (vector * curved);

            this.notifyListeners(this.value = value);
        });
    }

    /**
     * Returns the progress value of the parent.
     * 
     * @returns {number}
    */
    get progressValue() {
        return this.controller.progressValue;
    }

    get lowerValue() { return this.controller.lowerValue; }
    get upperValue() { return this.controller.upperValue; }
    
    /**
     * Returnes the current status of the parent.
     * 
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

    /**
     * @param {number} delay - milliseconds
     */
    forward(delay) { this.animateTo(this.upperValue, delay); }

    /**
     * @param {number} delay - milliseconds
     */
    backward(delay) { this.animateTo(this.lowerValue, delay); }

    /**
     * @param {number} startDelay - milliseconds
     * @param {number} cycleDelay - milliseconds
     */
    repeat(
        startDelay,
        cycleDelay
    ) {
        this.addStatusListener(status => {
            if (status == AnimationStatus.FORWARDED)  { return this.backward(cycleDelay); }
            if (status == AnimationStatus.BACKWARDED) { return this.forward(cycleDelay); }
        });
        
        this.forward(startDelay)
    }

    /**
     * For executing an animation towards a specific target given value.
     * 
     * @param {number} target
     * @param {number} delay - milliseconds
     */
    animateTo(
        target,
        duration,
        delay = 0,
        isAbsoluteDuration,
    ) {
        this.controller.animateTo(
            target,
            duration ?? undefined,
            delay,
            isAbsoluteDuration,
            () => {
                this.start = this.value || this.controller.value;
                this.end   = target;
            }
        );
    }
}
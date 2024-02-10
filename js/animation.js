import { Animatable, AnimationController, AnimationStatus } from "./animation_controller.js";
import { Cubic } from "./cubic.js";
import { CurvedAnimation } from "./curved_animation.js";



// This is value of an animation extent does not exist. (non-clamping)
export class Animation extends Animatable {
    /**
     * @param {number} duration
     * @param {number} initialValue
     * @param {Cubic} curve 
     */
    constructor(
        duration,
        initialValue = 0,
        curve,
    ) {
        super();
        this.duration = duration;
        this._value   = initialValue ?? 0;
        this._status  = AnimationStatus.NONE;
        this.curve    = curve;

        // This is only raw member variables in this class.
        this.listeners = [];
        this.statusListeners = [];
    }

    set value(newValue) {
        return this.notifyListeners(this._value = newValue);
    }

    get value() {
        return this._value;
    }

    set status(newStatus) {
        this.notifyStatusListeners(this._status = newStatus);
    }

    get status() {
        return this._status;
    }

    /**
     * @param {AnimationUpdateListener} callback 
     */
    addListener(callback) {
        if (this.listeners.includes(callback)) {
            throw new Error("Already added given listener in this controller.");
        }

        this.listeners.push(callback);
    }

    /**
     * @param {AnimationUpdateListener} callback 
     */
    removeListener(callback) {
        if (this.listeners.includes(callback) == false) {
            throw new Error("Already not added given listener in this controller.");
        }

        this.listeners.remove(callback);
    }

    /**
     * @param {number} value
     */
    notifyListeners(value) {
        this.listeners.forEach(listener => listener(value))
    }

    /**
     * @param {AnimationStatusListener} callback 
     */
    addStatusListener(callback) {
        if (this.statusListeners.includes(callback)) {
            throw new Error("Already added given status listener in this controller.");
        }

        this.statusListeners.push(callback);
    }

    /**
     * @param {AnimationStatusListener} callback 
     */
    removeStatusListener(callback) {
        if (this.statusListeners.includes(callback) == false) {
            throw new Error("Already not added given status listener in this controller.");
        }

        this.statusListeners.remove(callback);
    }

    /**
     * @param {AnimationStatus} status
     */
    notifyStatusListeners(status) {
        this.statusListeners.forEach(listener => listener(status))
    }
    
    /**
     * @param {number} target
     * @param {number} duration 
    */
    animateTo(
        target,
        duration = this.duration
    ) {
        const isBackward = target < this.value;
        
        this.status = isBackward
            ? AnimationStatus.BACKWARD
            : AnimationStatus.FORWARD;

        this.start = this.value;
        this.end   = target;
        
        const controller = new AnimationController(duration);
        this.parent?.dispose();
        this.parent = this.curve != null
            ? new CurvedAnimation(controller, this.curve)
            : controller;

        console.log(this.parent);
        
        this.parent.addListener(value => { // ... relative value =>
            const vector = this.end - this.start;
            const abs    = this.start + (vector * value);

            this.value = abs;
        })
        this.parent.addStatusListener(status => {
            if (status == AnimationStatus.FORWARDED) {
                this.status = isBackward
                    ? AnimationStatus.BACKWARDED
                    : AnimationStatus.FORWARDED;
            }
        });
        this.parent.forward();
    }
}
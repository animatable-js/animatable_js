import { Ticker } from "./ticker.js";



/**
 * @typedef {(availableDelta: number) => number} AnimationConsumeCallback
 * @typedef {(value: number) => any} AnimationUpdateListener
 * @typedef {(status: AnimationStatus) => any} AnimationStatusListener
 */

export const AnimationStatus = {
    NONE:       "none",
    FORWARD:    "forward",
    FORWARDED:  "forwarded",
    BACKWARD:   "backward",
    BackWARDED: "backwarded",
}

export class AnimationController {
    /**
     * @param {number} initialValue
     * @param {number} lowerValue 
     * @param {number} upperValue 
     * @param {number} duration - milliseconds
     */
    constructor(initialValue, lowerValue, upperValue, duration) {
        this.lowerValue = lowerValue || 0;
        this.upperValue = upperValue || 1;
        this.value = initialValue || this.lowerValue;
        this.duration = duration;
        this.activeTicker = null;
        this.status = AnimationStatus.NONE;

        // This is only raw member variables in this class.
        this.listeners = [];
        this.statusListeners = [];
    }

    /**
     * @param {number} newValue
     * @returns {number} 
     */
    setValue(newValue) {
        this.notifyListeners(this.value = newValue);
    }

    /**
     * @param {AnimationStatus} newStatus
     */
    setStatus(newStatus) {
        this.notifyStatusListeners(this.status = newStatus);
    }

    forward() {
        if (this.upperValue == null) {
            throw "upperValue must be defined for this function to be called.";
        }

        this.animateTo(this.upperValue, this.duration, (delta) => {
            this.setValue(this.value + delta);
        });
    }

    backward() {
        if (this.lowerValue == null) {
            throw "lowerValue must be defined for this function to be called.";
        }

        this.animateTo(this.lowerValue, this.duration);
    }

    /**
     * @param {number} target
     * @param {number} duration milliseconds
     * @param {AnimationConsumeCallback} consume
     */
    animateTo(target, duration, consume) {
        if (consume instanceof Function == false) {
            throw "consume callback was not given in animateTo() of the AnimationController.";
        }
        if (this.activeTicker != null) {
            this.activeTicker.dispose();
        }

        this.setStatus(
            this.value > target
                ? AnimationStatus.BACKWARD
                : AnimationStatus.FORWARD
        )

        this.activeTicker = new Ticker((delta) => {
            consume(delta / duration);
        });
    }

    /**
     * @param {AnimationUpdateListener} callback 
     */
    addListener(callback) {
        if (this.listeners.includes(callback)) {
            throw "Already added given listener in this controller.";
        }

        this.listeners.push(callback);
    }

    /**
     * @param {AnimationUpdateListener} callback 
     */
    removeListener(callback) {
        if (this.listeners.includes(callback) == false) {
            throw "Already not added given listener in this controller."
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
            throw "Already added given status listener in this controller.";
        }

        this.statusListeners.push(callback);
    }

    /**
     * @param {AnimationStatusListener} callback 
     */
    removeStatusListener(callback) {
        if (this.statusListeners.includes(callback) == false) {
            throw "Already not added given status listener in this controller."
        }

        this.statusListeners.remove(callback);
    }

    /**
     * @param {AnimationStatus} status
     */
    notifyStatusListeners(status) {
        this.statusListeners.forEach(listener => listener(status))
    }
}
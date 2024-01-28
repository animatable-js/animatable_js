import { Ticker } from "./ticker.js";



/**
 * @typedef {(availableDelta) => number} AnimationConsumeCallback
 * @typedef {(value) => any} AnimationUpdateCallback
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

        this.listeners = []; // this only own variable in this class.
    }

    /**
     * @param {number} newValue
     * @returns {number} 
     */
    setValue(newValue) {
        this.notifyListeners(this.value = newValue);
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

        this.status = this.value > target
            ? AnimationStatus.BACKWARD
            : AnimationStatus.FORWARD;

        this.activeTicker = new Ticker((delta) => {
            consume(delta / duration);
        });
    }

    /**
     * @param {AnimationUpdateCallback} callback 
     */
    addListener(callback) {
        if (this.listeners.includes(callback)) {
            throw "Already added given listener in this controller.";
        }

        this.listeners.push(callback);
    }

    /**
     * @param {AnimationUpdateCallback} callback 
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
}
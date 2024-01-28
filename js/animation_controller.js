import { Ticker } from "./ticker.js";



/**
 * @typedef {(availableDelta) => number} AnimationConsumeCallback
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
     * @param {number} lowerValue 
     * @param {number} upperValue 
     * @param {number} duration milliseconds
     */
    constructor(lowerValue, upperValue, duration) {
        this.lowerValue = lowerValue || 0;
        this.upperValue = upperValue || 1;
        this.value = this.lowerValue;
        this.duration = duration;
        this.activeTicker = null;
        this.status = AnimationStatus.NONE;
    }

    forward() {
        if (this.upperValue == null) {
            throw "upperValue must be defined for this function to be called.";
        }

        this.animateTo(this.upperValue, this.duration, (delta) => {
            console.log(delta);
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
            consume(delta);
        });
    }

    /**
     * @param {Function} callback 
     */
    addListener(callback) {
        
    }
}
import { Ticker } from "./ticker.js";



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

        this.animate(this.lowerValue, this.duration);
    }

    backward() {
        if (this.lowerValue == null) {
            throw "lowerValue must be defined for this function to be called.";
        }

        this.animate(this.upperValue, this.duration);
    }

    /**
     * @param {number} target
     * @param {number} duration milliseconds
     */
    animateTo(target, duration) {
        if (this.activeTicker != null) {
            this.activeTicker.dispose();
        }

        this.status = this.value > target
            ? AnimationStatus.BACKWARD
            : AnimationStatus.FORWARD;

        this.activeTicker = new Ticker((delta) => {
            console.log(delta);
        });
    }

    /**
     * @param {Function} callback 
     */
    addListener(callback) {

    }
}
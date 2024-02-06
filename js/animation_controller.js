import { Ticker } from "./ticker.js";

/**
 * @typedef {(availableDelta: number) => number} AnimationConsumeCallback
 * @typedef {(value: number) => void} AnimationUpdateListener
 * @typedef {(status: AnimationStatus) => void} AnimationStatusListener
 */

export const AnimationStatus = {
    NONE:       "none",
    FORWARD:    "forward",
    FORWARDED:  "forwarded",
    BACKWARD:   "backward",
    BACKWARDED: "backwarded",
}

export class Animatable {
    constructor() {
        if (this.constructor === Animatable) {
            throw new Error("This class is an abstract class.");
        }
    }

    /**
     * @param {AnimationUpdateListener} callback 
     */
    addListener(callback) {
        throw new Error("This function must be implemented.");
    }

    /**
     * @param {AnimationUpdateListener} callback 
     */
    removeListener(callback) {
        throw new Error("This function must be implemented.");
    }

    /**
     * @param {AnimationStatusListener} callback 
     */
    addStatusListener(callback) {
        throw new Error("This function must be implemented.");
    }

    /**
     * @param {AnimationStatusListener} callback 
     */
    removeStatusListener(callback) {
        throw new Error("This function must be implemented.");
    }
}

export class AnimationController extends Animatable {
    /**
     * @param {number} duration - milliseconds
     * @param {number} initialValue
     * @param {number} lowerValue
     * @param {number} upperValue
     * @param {boolean} isAbsoluteDuration 
     */
    constructor(
        duration,
        initialValue,
        lowerValue,
        upperValue,
        isAbsoluteDuration
    ) {
        super();
        this.lowerValue = lowerValue || 0;
        this.upperValue = upperValue || 1;
        this.initialValue = initialValue ?? this.lowerValue;
        if (this.lowerValue > this.upperValue) throw new Error("The lowerValue must be less than the upperValue.");
        if (this.lowerValue > this.initialValue
         || this.upperValue < this.initialValue) {
            throw new Error("The initialValue given is extent overflowed.");
        }
        if (this.lowerValue == this.upperValue) {
            throw new Error("min and max ranges cannot be the same.");
        }

        /** @type {number} */
        this.value = this.initialValue;
        this.duration = duration || 0;
        this.isAbsoluteDuration = isAbsoluteDuration || false;
        this.epsilon = Number.EPSILON * this.upperValue;

        /** @type {Ticker} */
        this.activeTicker = null;
        this.status = AnimationStatus.NONE;

        // This is only raw member variables in this class.
        this.listeners = [];
        this.statusListeners = [];
    }

    /**
     * Returns a relative range of animation value.
     * 
     * @returns {number}
    */
    get range() {
        return this.upperValue - this.lowerValue;
    }

    /**
     * Returns a relative value of animation from 0 to 1.
     * 
     * @returns {number}
     */
    get relValue() {
        const  vector = this.value - this.lowerValue;
        return vector / this.range;
    }

    /**
     * @param {number} newValue
     * @returns {number} Remaining value after being consumed.
     */
    setValue(newValue) {
        if (this.value == newValue) return 0;

        const oldValue = this.value;

        // When defining, the new value must not be out of extent.
        {
            if (newValue > this.upperValue) {
                this.notifyListeners(this.value = this.upperValue);
            } else if (newValue < this.lowerValue) {
                this.notifyListeners(this.value = this.lowerValue);
            } else {
                this.notifyListeners(this.value = newValue);
            }
        }

        return this.value - oldValue;
    }

    /**
     * @param {AnimationStatus} newStatus
     */
    setStatus(newStatus) {
        if (newStatus == null) {
            throw new Error("status must be not nullable in this animation controller.");
        }

        this.notifyStatusListeners(this.status = newStatus);
    }
    
    /**
     * Animate from current value to 1.
     * 
     * @param {number} delay - milliseconds
     * @param {boolean} isAbsoluteDuration
     */
    forward(
        delay = 0,
        isAbsoluteDuration
    ) {
        if (this.upperValue == this.value) return;
        if (this.upperValue == null) {
            throw new Error("upperValue must be defined for this function to be called.");
        }

        this.animateTo(this.upperValue, this.duration, delay, isAbsoluteDuration);
    }
    
    /**
     * Animate from current value to 0.
     * 
     * @param {number} delay - milliseconds
     * @param {boolean} isAbsoluteDuration
     */
    backward(
        delay = 0,
        isAbsoluteDuration
    ) {
        if (this.lowerValue == this.value) return;
        if (this.lowerValue == null) {
            throw new Error("lowerValue must be defined for this function to be called.");
        }

        this.animateTo(this.lowerValue, this.duration, delay, isAbsoluteDuration);
    }

    /**
     * @param {number} startDelay - milliseconds
     * @param {number} cycleDelay - milliseconds
     */
    repeat(
        startDelay,
        cycleDelay,
    ) {
        this.addStatusListener(status => {
            if (status == AnimationStatus.FORWARDED)  { return this.backward(cycleDelay); }
            if (status == AnimationStatus.BACKWARDED) { return this.forward(cycleDelay); }
        });

        this.forward(startDelay);
    }

    /**
     * @param {boolean} isBackward 
     */
    createConsumeFunc(isBackward = false) {
        if (isBackward) {
            return delta => this.setValue(this.value - delta);
        } else {
            return delta => this.setValue(this.value + delta);
        }
    }

    /**
     * For executing an animation towards a specific target given value.
     * 
     * @param {number} target
     * @param {number} duration - milliseconds
     * @param {number} delay    - milliseconds
     * @param {boolean} isAbsoluteDuration
     * @param {Function} onStart - Called to perform an initialization task.
     * @param {AnimationConsumeCallback} consume
     */
    animateTo(
        target,
        duration = this.duration,
        delay = 0,
        isAbsoluteDuration = this.isAbsoluteDuration,
        onStart,
        consume = this.createConsumeFunc(this.value > target),
    ) {
        if (duration == null || isNaN(duration) || duration == 0) {
            throw new Error("duration for animation was not given in animateTo() of the AnimationController.");
        }
        if (consume instanceof Function == false) {
            throw new Error("consume callback was not given in animateTo() of the AnimationController.");
        }
        
        // Initializes aysnc timeout.
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        
        this.timer ??= setTimeout(() => {
            onStart?.call();

            const isBackward   = this.value > target;
            const totalConumed = Math.abs(target - this.value);

            this.setStatus(
                isBackward
                    ? AnimationStatus.BACKWARD
                    : AnimationStatus.FORWARD
            )
            
            this.activeTicker?.dispose();
            this.activeTicker = new Ticker((delta) => {
                const durationExponent = isAbsoluteDuration ? totalConumed : this.range;
                const available = delta / (duration / durationExponent);
                
                // The consumed direction of movement of the value is not important.
                const consumed = Math.abs(consume(available));

                if (Math.abs(consumed - available) >= this.epsilon) {
                    this.activeTicker.dispose();
                    this.activeTicker = null;

                    this.setStatus(
                        isBackward
                            ? AnimationStatus.BACKWARDED
                            : AnimationStatus.FORWARDED
                    )
                }
            });

            this.timer = null;
        }, delay);
    }
    
    dispose() {
        this.activeTicker?.dispose();
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
}
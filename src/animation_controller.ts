import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./type";
import { Ticker } from "./ticker";

export class AnimationController extends Animatable {
    private listeners: AnimationListener[] = [];
    private statusListeners: AnimationStatusListener[] = [];

    /** This tween is mainly used to calculate the progress value. */
    private tween: {begin: number, end: number};

    /** An activated ticker about this animation controller. */
    private activeTicker?: Ticker;

    private _status: AnimationStatus = AnimationStatus.NONE;
    get status() { return this._status; }
    set status(newStatus: AnimationStatus) {
        if (this._status != newStatus) {
            this.notifyStatusListeners(this._status = newStatus);
        }
    }

    private _value: number;
    get value() { return this._value };
    set value(newValue: number) {
        if (this._value != newValue) {
            this.notifyListeners(this._value = newValue);
        }
    }

    constructor(
        public duration: number,
        public lowerValue: number = 0,
        public upperValue: number = 1,
    ) {
        super();
        if (this.lowerValue > this.upperValue) {
            throw new Error("The lowerValue must be less than the upperValue.");
        }

        this._value = this.lowerValue;
    }

    addListener(listener: AnimationListener) {
        console.assert(!this.listeners.includes(listener), "Already a given listener does exist.");
        this.listeners.push(listener);
    }

    removeListener(listener: AnimationListener) {
        console.assert(this.listeners.includes(listener), "Already a given listener does not exist.");
        this.listeners = this.listeners.filter(l => l != listener);
    }

    addStatusListener(listener: AnimationStatusListener) {
        console.assert(!this.statusListeners.includes(listener), "Already a given status listener does exist.");
        this.statusListeners.push(listener);
    }

    removeStatusListener(listener: AnimationStatusListener) {
        console.assert(this.statusListeners.includes(listener), "Already a given status listener does not exist.");
        this.statusListeners = this.statusListeners.filter(l => l != listener);
    };

    /** Notifies a new value updated for a registered animation listeners. */
    notifyListeners(value: number) {
        this.listeners.forEach(l => l(value));
    }

    /** Notifies a new status updated for a registered animation status listeners. */
    notifyStatusListeners(status: AnimationStatus) {
        this.statusListeners.forEach(l => l(status));
    }

    /** Returns a relative range of animation value. */
    get range(): number {
        return this.upperValue - this.lowerValue;
    }

    /** Returns a relative value of aniomatin from 0 to 1. */
    get relValue(): number {
        const  vector = this.value - this.lowerValue;
        return vector / this.range;
    }

    /**
     * Returns the relative value regardless of the progress direction
     * of the animation value from 0 to 1.
     */
    get progressValue(): number {
        const begin     = this.tween.begin;
        const end       = this.tween.end;
        const relVector = end - begin;

        return (this.relValue - begin) / relVector;
    }

    forward(duration?: number) {
        this.animateTo(this.upperValue, duration);
    }

    backward(duration?: number) {
        this.animateTo(this.lowerValue, duration);
    }

    animateTo(value: number, duration?: number) {
        this.animate(this.value, value, duration);
    }

    animate(
        from: number,
        to: number,
        duration: number = this.duration
    ) {
        if (to == from) return;
        console.assert(from >= this.lowerValue, "A given [from] is less than the min-range.");
        console.assert(to   <= this.upperValue, "A given [to] is larger than the max-range.");

        // Sets initial related animation values.
        this.value = from;
        this.tween = {begin: from, end: to};

        // Whether a value should be increased.
        const isForward = to > from;

        // Update the status before the animation starts.
        this.status = isForward
            ? AnimationStatus.FORWARD
            : AnimationStatus.BACKWARD;

        // A total move distance of start to end.
        const rDistance = this.range;
        const rDuration = duration / rDistance;

        this.activeTicker?.dispose();
        this.activeTicker = new Ticker(elapsedDelta => {
            const delta     = elapsedDelta / rDuration;
            const available = isForward ? delta : -delta;
            const consumed  = this.consume(from, to, available);

            if (Math.abs(available - consumed) > 1e-10) { // unconsumed > precision error tolerance
                this.value = to;
                this.dispose();

                // Update the status after the animation ends.
                this.status = isForward
                    ? AnimationStatus.FORWARDED
                    : AnimationStatus.BACKWARDED;

                return;
            }
            
            // A value should not be overflowed by consumed value.
            this.value += consumed;
        });
    }

    private consume(
        from: number,
        to: number,
        available: number
    ) {
        const absValue = this.value + available;
        const relValue = to - absValue;

        return to > from // is forward
            ? relValue <= 0 ? relValue : available
            : relValue >= 0 ? relValue : available;
    }

    dispose(): void {
        this.activeTicker?.dispose();
        this.activeTicker = null;
    }

    reset() {
        this.value = this.lowerValue;
        this.tween = null;
    }
}
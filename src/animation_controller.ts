import { AnimationStatus } from "./animatable";
import { Ticker } from "./ticker";
import { AnimationListenable } from "./animation_listenable";

export class AnimationController extends AnimationListenable {
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

    repeat() {
        this.addStatusListener(status => {
            if (status == AnimationStatus.FORWARDED) this.backward();
            if (status == AnimationStatus.BACKWARDED) this.forward();
        });

        if (this.status == AnimationStatus.NONE
         || this.status == AnimationStatus.BACKWARDED) {
            this.forward();
        }
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
        this.status = AnimationStatus.NONE;
        this.value = this.lowerValue;
        this.tween = null;
    }
}
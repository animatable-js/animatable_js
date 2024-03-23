import { Animatable, AnimationStatus } from "./animatable";
import { Ticker } from "./ticker";
import { AnimationListener, AnimationStatusListener } from "./type";

export class Animation extends Animatable {
    private listeners: AnimationListener[] = [];
    private statusListeners: AnimationStatusListener[] = [];

    /** An activated ticker about this animation controller. */
    private activeTicker?: Ticker;

    /** A default absolute duration. */
    readonly duration: number;

    private _status: AnimationStatus = AnimationStatus.NONE;
    get status() { return this._status; }
    set status(newStatus: AnimationStatus) {
        if (this._status != newStatus) {
            this._status = newStatus;
            this.notifyStatusListeners(this.status);
        }
    }

    private _value: number;
    get value() { return this._value };
    set value(newValue: number) {
        if (this._value != newValue) {
            this._value = newValue;
            this.notifyListeners(this.value);
        }
    }

    constructor(initialValue: number, duration: number) {
        super();
        this.value = initialValue;
        this.duration = duration;
    }

    override addListener(listener: AnimationListener) {
        console.assert(!this.listeners.includes(listener), "Already a given listener does exist.");
        this.listeners.push(listener);
    }

    override removeListener(listener: AnimationListener) {
        console.assert(this.listeners.includes(listener), "Already a given listener does not exist.");
        this.listeners = this.listeners.filter(l => l != listener);
    }

    override addStatusListener(listener: AnimationStatusListener) {
        console.assert(!this.statusListeners.includes(listener), "Already a given status listener does exist.");
        this.statusListeners.push(listener);
    }

    override removeStatusListener(listener: AnimationStatusListener) {
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

    animateTo(value: number, duration?: number) {
        this.animate(this.value, value, duration);
    }

    animate(
        from: number,
        to: number,
        duration: number = this.duration
    ) {
        if (to == from) return;

        // Sets initial animation value.
        this.value = from;

        // Whether a value should be increased.
        const isForward = to > from;

        // Update the status before the animation starts.
        this.status = isForward
            ? AnimationStatus.FORWARD
            : AnimationStatus.BACKWARD;

        this.activeTicker?.dispose();
        this.activeTicker = new Ticker(elapsed => {
            const delta = elapsed / duration;
            const available = isForward ? delta : -delta;
            const consumed = this.consume(from, to, available);
            
            if (Math.abs(available - consumed) > 0.000001) {
                this.value = to;
                this.dispose();

                // Update the status after the animation ends.
                this.status = isForward
                    ? AnimationStatus.FORWARDED
                    : AnimationStatus.BACKWARDED;
            } else {
                this.value += consumed;
            }
        });
    }

    private consume(
        from: number,
        to: number,
        available: number
    ) {
        const absValue = this.value + available;
        const relValue = to - absValue;

        if (to > from) {
            return relValue <= 0 ? relValue : available;
        } else {
            return relValue >= 0 ? relValue : available;
        }
    }

    override dispose() {
        this.activeTicker.dispose();
        this.activeTicker = null;
    }
}
import { Animatable, AnimationStatus } from "./animatable";
import { Ticker } from "./ticker";
import { AnimationListener, AnimationStatusListener } from "./type";

export class Animation extends Animatable {
    private listeners: AnimationListener[] = [];
    private statusListeners: AnimationStatusListener[] = [];

    private status: AnimationStatus = AnimationStatus.NONE;

    /** An activated ticker about this animation controller. */
    private activeTicker?: Ticker;

    /** A default absolute duration. */
    readonly duration: number;

    private _value: number;
    set value(newValue: number) {
        if (this._value != newValue) {
            this._value = newValue;
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

    animateTo(from: number, duration: number) {
        this.animate(this.value, from, duration);
    }

    animate(
        to: number,
        from: number,
        duration?: number
    ) {
        if (to == from) return;
        
        this.activeTicker?.dispose();
        this.activeTicker = new Ticker(elapsed => {
            console.log(elapsed);
        });
    }

    override dispose() {
        this.activeTicker.dispose();
    }
}
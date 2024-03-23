import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./type";
export declare class Animation extends Animatable {
    private listeners;
    private statusListeners;
    private status;
    /** An activated ticker about this animation controller. */
    private activeTicker?;
    /** A default absolute duration. */
    readonly duration: number;
    private _value;
    set value(newValue: number);
    constructor(initialValue: number, duration: number);
    addListener(listener: AnimationListener): void;
    removeListener(listener: AnimationListener): void;
    addStatusListener(listener: AnimationStatusListener): void;
    removeStatusListener(listener: AnimationStatusListener): void;
    /** Notifies a new value updated for a registered animation listeners. */
    notifyListeners(value: number): void;
    /** Notifies a new status updated for a registered animation status listeners. */
    notifyStatusListeners(status: AnimationStatus): void;
    animateTo(from: number, duration: number): void;
    animate(to: number, from: number, duration?: number): void;
    dispose(): void;
}

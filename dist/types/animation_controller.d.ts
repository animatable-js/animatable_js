import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./type";
export declare class AnimationController extends Animatable {
    duration: number;
    lowerValue: number;
    upperValue: number;
    private listeners;
    private statusListeners;
    /** This tween is mainly used to calculate the progress value. */
    private tween;
    /** An activated ticker about this animation controller. */
    private activeTicker?;
    private _status;
    get status(): AnimationStatus;
    set status(newStatus: AnimationStatus);
    private _value;
    get value(): number;
    set value(newValue: number);
    constructor(duration: number, lowerValue?: number, upperValue?: number);
    addListener(listener: AnimationListener): void;
    removeListener(listener: AnimationListener): void;
    addStatusListener(listener: AnimationStatusListener): void;
    removeStatusListener(listener: AnimationStatusListener): void;
    /** Notifies a new value updated for a registered animation listeners. */
    notifyListeners(value: number): void;
    /** Notifies a new status updated for a registered animation status listeners. */
    notifyStatusListeners(status: AnimationStatus): void;
    /** Returns a relative range of animation value. */
    get range(): number;
    /** Returns a relative value of aniomatin from 0 to 1. */
    get relValue(): number;
    /**
     * Returns the relative value regardless of the progress direction
     * of the animation value from 0 to 1.
     */
    get progressValue(): number;
    forward(duration?: number): void;
    backward(duration?: number): void;
    animateTo(value: number, duration?: number): void;
    animate(from: number, to: number, duration?: number): void;
    private consume;
    dispose(): void;
    reset(): void;
}

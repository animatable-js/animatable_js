import { AnimationStatus } from "./animatable";
import { AnimationListenable } from "./animation_listenable";
/**
 * This class implements the fundamental features that make up the animation.
 *
 * See Also, this class provides the essential groundwork for animation functionality.
 * It serves as a foundational component that simplifies the implementation process.
 * As a result, developers can more easily create various complex animation features.
 */
export declare class AnimationController extends AnimationListenable {
    duration: number;
    lowerValue: number;
    upperValue: number;
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
    constructor(duration: number, lowerValue?: number, upperValue?: number, initialValue?: number);
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
    repeat(): void;
    animateTo(value: number, duration?: number): void;
    animate(from: number, to: number, duration?: number): void;
    private consume;
    dispose(): void;
    reset(): void;
}

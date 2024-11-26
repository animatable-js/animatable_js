import { AnimationStatus } from "./animatable";
import { AnimationController } from "./animation_controller";
import { AnimationListenable } from "./animation_listenable";
import { Cubic } from "./cubic";
import { NumberTween } from "./tween";
/** This class implements non-clamping animation. */
export declare class Animation extends AnimationListenable {
    curve?: Cubic;
    value: number;
    status: AnimationStatus;
    tween: NumberTween;
    parent: AnimationController;
    constructor(duration: number, curve?: Cubic, initialValue?: number);
    /** Animates from a given [a] to a given [b] repeatedly. */
    repeat(a?: number, b?: number, maxCount?: number): void;
    /** Animates from current animation value to a given static value. */
    animateTo(value: number): void;
    /**
     * Animates from current animation value to a given delta value.
     * e.g. If the current animation value is 1 and the factor value
     * is given as 1, it is animated from 1 to 2.
     */
    animateBy(delta: number): void;
    animate(from: number, to: number): void;
    dispose(): void;
}

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
    animateTo(value: number): void;
    animate(from: number, to: number): void;
    dispose(): void;
}

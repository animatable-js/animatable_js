import { Animatable } from "./animatable";
import { AnimationController } from "./animation_controller";
import { Cubic } from "./cubic";
import { NumberTween } from "./tween";
import { AnimationListener, AnimationStatusListener } from "./type";
/** This class implements non-clamping animation. */
export declare class Animation extends Animatable {
    curve?: Cubic;
    private listeners;
    private statusListeners;
    value: number;
    tween: NumberTween;
    parent: AnimationController;
    constructor(duration: number, curve?: Cubic);
    addListener(listener: AnimationListener): void;
    removeListener(listener: AnimationListener): void;
    addStatusListener(listener: AnimationStatusListener): void;
    removeStatusListener(listener: AnimationStatusListener): void;
    notifyListeners(value: number): void;
    animateTo(value: number): void;
    animate(from: number, to: number): void;
    dispose(): void;
}

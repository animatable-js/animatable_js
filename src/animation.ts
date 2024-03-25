import { Animatable } from "./animatable";
import { AnimationController } from "./animation_controller";
import { Cubic } from "./cubic";
import { NumberTween } from "./tween";
import { AnimationListener, AnimationStatusListener } from "./type";

/** This class implements non-clamping animation. */
export class Animation extends Animatable {
    private listeners: AnimationListener[] = [];
    private statusListeners: AnimationStatusListener[] = [];

    value: number = 0;
    tween: NumberTween;
    parent: AnimationController;

    constructor(duration: number, public curve?: Cubic) {
        super();

        this.parent = new AnimationController(duration, 0, 1);
        this.parent.addListener(_ => {
            const progressValue = this.parent.progressValue;

            if (curve == null) {
                this.notifyListeners(this.value = this.tween.transform(progressValue));
                return;
            }

            const curved = curve.transform(progressValue);
            const vector = this.tween.end - this.tween.begin;
            const value  = this.tween.begin + (vector * curved);

            this.notifyListeners(this.value = value);
        });
    }

    addListener(listener: AnimationListener) {
        console.assert(!this.listeners.includes(listener), "Already a given listener does exist.");
        this.listeners.push(listener);
    }
    removeListener(listener: AnimationListener) {
        console.assert(this.listeners.includes(listener), "Already a given listener does not exist.");
        this.listeners = this.listeners.filter(l => l != listener);
    }
    addStatusListener(listener: AnimationStatusListener): void {
        throw new Error("Method not implemented.");
    }
    removeStatusListener(listener: AnimationStatusListener): void {
        throw new Error("Method not implemented.");
    }

    notifyListeners(value: number) {
        this.listeners.forEach(l => l(value));
    }

    animateTo(value: number) {
        this.animate(this.value, value);
    }

    animate(from: number, to: number) {
        this.tween = new NumberTween(from, to);
        this.parent.reset();
        this.parent.forward();
    }

    dispose(): void {
        this.tween = null;
        this.parent.dispose();
        this.parent = null;
    }
}
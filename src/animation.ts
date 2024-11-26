import { AnimationStatus } from "./animatable";
import { AnimationController } from "./animation_controller";
import { AnimationListenable } from "./animation_listenable";
import { Cubic } from "./cubic";
import { NumberTween } from "./tween";
import { AnimationStatusListener } from "./types";

/** This class implements non-clamping animation. */
export class Animation extends AnimationListenable {
    value: number;
    status: AnimationStatus = AnimationStatus.NONE;

    tween: NumberTween;
    parent: AnimationController;

    constructor(duration: number, public curve?: Cubic, initialValue?: number) {
        super();

        // See also: An animation default value must be 0.
        this.value = initialValue ?? 0;

        this.parent = new AnimationController(duration, 0, 1);
        this.parent.addListener(_ => {
            const progressValue = this.parent.progressValue;

            // For reduce unnecessary calculations.
            if (curve == null) {
                this.notifyListeners(this.value = this.tween.transform(progressValue));
                return;
            }

            const curved = curve.transform(progressValue);
            const vector = this.tween.end - this.tween.begin;
            const value  = this.tween.begin + (vector * curved);

            this.notifyListeners(this.value = value);
        });

        // In this case, the raw controller only increases from 0 to 1,
        // must be tracking the status separately.
        this.parent.addStatusListener(status => {
            if (status == AnimationStatus.NONE) return;

            const isForward = this.tween.end > this.tween.begin;
            if (status == AnimationStatus.FORWARD) {
                this.notifyStatusListeners(this.status = isForward
                    ? AnimationStatus.FORWARD
                    : AnimationStatus.BACKWARD
                );
            } else { // When ended.
                this.notifyStatusListeners(this.status = isForward
                    ? AnimationStatus.FORWARDED
                    : AnimationStatus.BACKWARDED
                );
            }
        });
    }

    /** Animates from a given [a] to a given [b] repeatedly. */
    repeat(
        a: number = 0,
        b: number = 1,
        maxCount: number = Infinity
    ) {
        if (Math.abs(a - b) < 1e-10) return; // delta < precision error tolerance

        const isF = a < b; // is forward.
        const toA: Function = () => this.animate(b, a);
        const toB: Function = () => this.animate(a, b);

        // The current repeated count total about animation.
        let count = 0;
        let callback: AnimationStatusListener;

        this.addStatusListener(callback = status => {
            if (status == AnimationStatus.FORWARDED ) isF ? toA() : toB();
            if (status == AnimationStatus.BACKWARDED) isF ? toB() : toA();
            if (++count == maxCount) {
                this.removeStatusListener(callback);
                return;
            }
        });

        if (this.status == AnimationStatus.NONE
         || this.status == AnimationStatus.BACKWARDED) toB();
    }

    /** Animates from current animation value to a given static value. */
    animateTo(value: number) {
        this.animate(this.value, value);
    }

    /**
     * Animates from current animation value to a given delta value.
     * e.g. If the current animation value is 1 and the factor value
     * is given as 1, it is animated from 1 to 2.
     */
    animateBy(delta: number) {
        this.animate(this.value, this.value + delta);
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
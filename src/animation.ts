import { AnimationStatus } from "./animatable";
import { AnimationController } from "./animation_controller";
import { AnimationListenable } from "./animation_listenable";
import { Cubic } from "./cubic";
import { NumberTween } from "./tween";

/** This class implements non-clamping animation. */
export class Animation extends AnimationListenable {
    value: number;
    status: AnimationStatus = AnimationStatus.NONE;

    tween: NumberTween;
    parent: AnimationController;

    constructor(duration: number, public curve?: Cubic, initialValue?: number) {
        super();
        
        this.value = initialValue ?? 0;

        console.assert(duration != null, "An animation duration cannot be null.")
        console.assert(duration != 0, "An animation duration cannot be 0.");
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

    animateTo(value: number) {
        if (value != this.value) this.animate(this.value, value);
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
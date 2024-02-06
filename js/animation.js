import { Animatable, AnimationController, AnimationStatus } from "./animation_controller.js";
import { Cubic } from "./cubic.js";
import { CurvedAnimation } from "./curved_animation.js";



// This is value of an animation extent does not exist. (non-clamping)
export class Animation extends Animatable {
    /**
     * @param {number} duration
     * @param {number} initialValue
     * @param {Cubic} curve 
     */
    constructor(
        duration,
        initialValue = 0,
        curve,
    ) {
        super();
        this.duration = duration;
        this.value = initialValue;
        this.curve = curve;

        this.status = AnimationStatus.NONE;
    }

    set status(newStatus) {
        this.notifyStatusListeners(this._status = newStatus);
    }

    get status() {
        return this._status;
    }

    addListener() { }
    removeListener() { }
    addStatusListener() { }
    removeStatusListener() { }
    notifyStatusListeners(newStatus) {
        
    }
    
    /**
     * @param {number} target
     * @param {number} duration 
    */
    animateTo(
        target,
        duration = this.duration
    ) {
        const isBackward = target < this.value;
        
        this.status = isBackward
            ? AnimationStatus.BACKWARD
            : AnimationStatus.FORWARD;

        const controller = new AnimationController(duration);
        this.parent?.dispose();
        this.parent = this.curve != null
            ? new CurvedAnimation(controller)
            : controller;

            console.log(target);
        
        this.parent.addListener(value => {
            this.value = value;
        })
        this.parent.addStatusListener(status => {
            if (status == AnimationStatus.FORWARDED) {
                this.status = isBackward
                    ? AnimationStatus.BACKWARDED
                    : AnimationStatus.FORWARDED;
            }
        });
        this.parent.forward(1);
    }
}
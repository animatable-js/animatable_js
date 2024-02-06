import { Animatable } from "./animation_controller.js";
import { Cubic } from "./cubic.js";



// This is value of an animation extent does not exist.
export class Animation extends Animatable {
    /**
     * @param {Cubic} curve 
     */
    constructor(
        initialValue = 0,
        curve,
    ) {
        super();
        this.initialValue = initialValue;
        this.curve = curve;
    }
}
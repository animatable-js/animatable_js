import { AnimationController, AnimationStatus } from "./animation_controller.js";
import { Cubic, CubicPoint } from "./cubic.js";

/**
 * @typedef {(deltaElpased) => void} TickerCallback
 */

export class Ticker {
    /**
     * @param {TickerCallback} callback 
     */
    constructor(callback) {
        this.callback = callback;
        this.isDisposed = false;
        
        this.id = requestAnimationFrame((_) => this.handle(_));
    }

    /**
     * @param {number} elpased - milliseconds
     */
    handle(elpased) {
        if (this.isDisposed) return;

        // Starting with a delta value of 0 is a typical behavior.
        const delta = elpased - this.previousElapsed || 0;
                                this.previousElapsed = elpased;
        
        this.callback(delta);
        this.id = requestAnimationFrame((_) => this.handle(_));
    }

    dispose() {
        this.isDisposed = true;
        cancelAnimationFrame(this.id);
    }
}

addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("box");
    const valueElement = document.getElementById("value");   
    const statusElement = document.getElementById("status");
    const button = document.getElementsByTagName("button")[0];

    new Cubic(new CubicPoint(0, 0.5), new CubicPoint(0.5, 1)).to(0.5);

    const controller = new AnimationController(null, 0, 1, 500);
    controller.addListener(value => {
        const percent = 100 * value;

        box.style.width = `${percent}%`;
        valueElement.textContent = `${Math.round(percent * 10) / 10}%`;
    });
    controller.addStatusListener(status => {
        statusElement.textContent = status;
    });
    
    button.onclick = () => {
        if (controller.status == AnimationStatus.NONE
         || controller.status == AnimationStatus.BACKWARD
         || controller.status == AnimationStatus.BACKWARDED) {
            controller.forward();
            return;
         }

        if (controller.status == AnimationStatus.FORWARD
         || controller.status == AnimationStatus.FORWARDED) controller.backward();
    }
});
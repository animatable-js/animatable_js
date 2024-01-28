import { AnimationController, AnimationStatus } from "./animation_controller.js";

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
    const controller = new AnimationController(null, 0, 1, 1000);
    controller.addListener(value => {
        console.log(value);
    });
    controller.addStatusListener(status => {
        console.log(status);
    });
    controller.forward();
});
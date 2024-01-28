import { AnimationController } from "./animation_controller.js";

/**
 * @typedef {(deltaElpased) => any} TickerCallback
 */

export class Ticker {
    /**
     * @param {TickerCallback} callback 
     */
    constructor(callback) {
        this.callback = callback;
        this.id = requestAnimationFrame((_) => this.handle(_));
    }

    /**
     * @param {int} elpased milliseconds
     */
    handle(elpased) {
        // Starting with a delta value of 0 is a typical behavior.
        const delta = elpased - this.previousElapsed || 0;
                                this.previousElapsed = elpased;
        
        this.callback(delta);
        this.id = requestAnimationFrame((_) => this.handle(_));
    }

    dispose() {
        cancelAnimationFrame(this.id);
    }
}

addEventListener("DOMContentLoaded", () => {
    const controller = new AnimationController();
    controller.forward();
});
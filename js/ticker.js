import { AnimationController } from "./animation_controller.js";

/**
 * @typedef {Function} TickerCallback
 */

export class Ticker {
    /**
     * @param {TickerCallback} callback 
     */
    constructor(callback) {
        this.callback = callback;
        this.isDisposed = false;

        requestAnimationFrame((_) => this.handle(_));
    }

    /**
     * @param {int} elpased milliseconds
     */
    handle(elpased) {
        if (this.isDisposed) return;

        const delta = elpased - this.previousElapsed || 0;
                                this.previousElapsed = elpased;
        
        this.callback(delta);
        requestAnimationFrame((_) => this.handle(_));
    }

    dispose() { this.isDisposed = true }
}

addEventListener("DOMContentLoaded", () => {
    const controller = new AnimationController();
    controller.animateTo(1, 1000);
});
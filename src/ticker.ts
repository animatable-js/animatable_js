import { TickerCallback } from "./type";

/**
 * This class is essential to implementing animation.
 * 
 * Used to define a elapsed duration between a previous frame and
 * the current frame when a frame updated.
 * 
 * Used by `Animation` class.
 */
export class Ticker {
    /** Whether the frame is not detected by ticker anymore. */
    private isDisposed: boolean = false;

    /** Unique id of the requested animation frame listener. */
    private id: number;

    /** A elapsed duration of the previous frame. */
    private previousElapsed: number;

    /**
     * When an instance is created by this constructor, a related task
     * is performed immediately.
     * 
     * See also:
     * @important A dispose() must be called after the ticker is used.
     */
    constructor(public callback: TickerCallback) {
        this.id = requestAnimationFrame(this.handle = this.handle.bind(this));
    }

    /** Called whenever a frame is updated. */
    handle(elapsed: number) {
        if (this.isDisposed) return;

        // Starting with a delta value of 0 is a commonly task.
        const delta = elapsed - (this.previousElapsed ?? elapsed);
                                 this.previousElapsed = elapsed;

        this.callback(delta);
        this.id = requestAnimationFrame(this.handle);
    }

    /** Cancels the registered animation frame listener. */
    dispose() {
        this.isDisposed = true;
        cancelAnimationFrame(this.id);
    }
}
import { TickerCallback } from "./types";
/**
 * This class is essential to implementing animation.
 *
 * Used to define a elapsed duration between a previous frame and
 * the current frame when a frame updated.
 *
 * Used by `Animation` class.
 */
export declare class Ticker {
    callback: TickerCallback;
    /**
     * When an instance is created by this constructor, a related task
     * is performed immediately.
     *
     * See also:
     * @important A dispose() must be called after the ticker is used.
     */
    constructor(callback: TickerCallback);
    /** Cancels the registered animation frame listener. */
    dispose(): void;
}

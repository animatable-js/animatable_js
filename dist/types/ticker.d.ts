import { TickerCallback } from "./type";
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
    /** Whether the frame is not detected by ticker anymore. */
    private isDisposed;
    /** Unique id of the requested animation frame listener. */
    private id;
    /** A elapsed duration of the previous frame. */
    private previousElapsed;
    /**
     * When an instance is created by this constructor, a related task
     * is performed immediately.
     *
     * See also:
     * @important A dispose() must be called after the ticker is used.
     */
    constructor(callback: TickerCallback);
    /** Called whenever a frame is updated. */
    handle(elapsed: number): void;
    /** Cancels the registered animation frame listener. */
    dispose(): void;
}

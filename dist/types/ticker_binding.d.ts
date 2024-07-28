import { TickerCallback } from "./types";
/**
 * Used to resolve overheads about the performance caused by frequent
 * `requestAnimationFrame` calls.
 */
export declare class TickerBinding {
    /** Whether the frame is not detected by ticker anymore. */
    private isDisposed;
    /** Unique id of the requested animation frame listener. */
    private id;
    /** A elapsed duration of the previous frame. */
    private previousElapsed;
    private static _instance;
    private constructor();
    static get instance(): TickerBinding;
    /** Defines the callback function that must be called when the new tick updated. */
    private callbacks;
    set onTick(callback: TickerCallback);
    set unTick(callback: TickerCallback);
    addListener(callback: TickerCallback): void;
    removeListener(callback: TickerCallback): void;
    /** Notifies a new delta value updated for a registered ticker listeners. */
    notifyTick(delta: number): void;
    /** Called whenever a frame is updated. */
    handle(elapsed: number): void;
    /** Cancels the registered animation frame listener. */
    dispose(): void;
}

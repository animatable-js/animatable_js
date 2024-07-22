import { TickerCallback } from "./type";
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
    private callbacks;
    set onTick(callback: TickerCallback);
    addListener(callback: TickerCallback): void;
    removeListener(callback: TickerCallback): void;
    notifyTick(delta: number): void;
    /** Called whenever a frame is updated. */
    handle(elapsed: number): void;
    /** Cancels the registered animation frame listener. */
    dispose(): void;
}

import { TickerCallback } from "./type";

export class TickerBinding {
    /** Whether the frame is not detected by ticker anymore. */
    private isDisposed: boolean = false;

    /** Unique id of the requested animation frame listener. */
    private id: number;

    /** A elapsed duration of the previous frame. */
    private previousElapsed: number;

    private static _instance: TickerBinding;
    private constructor() {
        this.id = requestAnimationFrame(this.handle = this.handle.bind(this));
    }

    static get instance() {
        return this._instance ?? (this._instance = new TickerBinding());
    }

    private callbacks: TickerCallback[] = [];

    set onTick(callback: TickerCallback) {
        this.callbacks.push(callback);
    }

    addListener(callback: TickerCallback) {
        console.assert(!this.callbacks.includes(callback), "Already exists a given callback function.");
        this.callbacks.push(callback);
    }

    removeListener(callback: TickerCallback) {
        console.assert(this.callbacks.includes(callback), "Already not exists a given callback function.");
        this.callbacks = this.callbacks.filter(c => c !== callback);
    }

    notifyTick(delta: number) {
        this.callbacks.forEach(func => func(delta));
    }

    /** Called whenever a frame is updated. */
    handle(elapsed: number) {
        if (this.isDisposed) return;

        // Starting with a delta value of 0 is a commonly task.
        const delta = elapsed - (this.previousElapsed ?? elapsed);
                                 this.previousElapsed = elapsed;

        this.notifyTick(delta);
        this.id = requestAnimationFrame(this.handle);
    }

    /** Cancels the registered animation frame listener. */
    dispose() {
        this.isDisposed = true;
        cancelAnimationFrame(this.id);
    }
}
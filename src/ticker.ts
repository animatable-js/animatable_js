import { TickerBinding } from "./ticker_binding";
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
    /**
     * When an instance is created by this constructor, a related task
     * is performed immediately.
     * 
     * See also:
     * @important A dispose() must be called after the ticker is used.
     */
    constructor(public callback: TickerCallback) {
        TickerBinding.instance.addListener(callback);
    }

    /** Cancels the registered animation frame listener. */
    dispose() {
        TickerBinding.instance.removeListener(this.callback);
    }
}
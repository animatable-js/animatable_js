import { AnimationStatus } from "./animatable";

/**
 * Signature for the callback function that a elapsed duration between
 * the previous frame and the current frame is given.
 */
export type TickerCallback = (elapsedDelta: number) => void;

/** Signature for the callback function that is called when the animation value changes. */
export type AnimationListener = (value: number) => void;

/** Signature for the callback function that is called when the animation status changes. */
export type AnimationStatusListener = (status: AnimationStatus) => void;
import { AnimationStatus } from "./animatable";

/** A elapsed duration between the previous frame and the current frame is given. */
export type TickerCallback = (elapsedDelta: number) => void;

export type AnimationListener = (value: number) => void;
export type AnimationStatusListener = (status: AnimationStatus) => void;
import { AnimationListener, AnimationStatusListener } from "./type";

/** Represent for the current status of the animation. */
export enum AnimationStatus {
    NONE,
    FORWARD,
    FORWARDED,
    BACKWARD,
    BACKWARDED,
}

/**
 * Provides the foundation for implementing an animation-related controller.
 * Used by `Animation` class.
 */
export abstract class Animatable {

    /** Registers a given animation listener to related controller. */
    abstract addListener(listener: AnimationListener): void;

    /** Cancels the registration for a given animation listener to related controller. */
    abstract removeListener(listener: AnimationListener): void;

    /** Registers a given animation status listener to related controller. */
    abstract addStatusListener(listener: AnimationStatusListener): void;

    /** Cancels the registration for a given animation status listener to related controller. */
    abstract removeStatusListener(listener: AnimationStatusListener): void;

    abstract dispose(): void;
}
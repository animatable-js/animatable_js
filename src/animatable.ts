import { AnimationListener, AnimationStatusListener } from "./types";

/** Signature for the constants that represents for the current status of the animation. */
export enum AnimationStatus {
    /** The tnitial status of animation. */
    NONE = "none",

    /** The animation is moving forward from its starting point. */
    FORWARD = "forward",

    /** The animation has completed its forward motion. */
    FORWARDED = "forwarded",

    /** The animation is moving backward, reversing its forward motion. */
    BACKWARD = "backward",

    /** The animation has completed its backward motion. */
    BACKWARDED = "backwarded",
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

    /** Dispose of all associated instances initialized from memory. */
    abstract dispose(): void;
}
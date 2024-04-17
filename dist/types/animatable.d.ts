import { AnimationListener, AnimationStatusListener } from "./type";
/** Represent for the current status of the animation. */
export declare enum AnimationStatus {
    NONE = 0,
    FORWARD = 1,
    FORWARDED = 2,
    BACKWARD = 3,
    BACKWARDED = 4
}
/**
 * Provides the foundation for implementing an animation-related controller.
 * Used by `Animation` class.
 */
export declare abstract class Animatable {
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

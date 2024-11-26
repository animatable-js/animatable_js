import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./types";
/**
 * This abstract class implements the animation related listener that
 * is called when the current animation value and status changed.
 */
export declare abstract class AnimationListenable extends Animatable {
    private listeners;
    private statusListeners;
    /**
     * Registers the given listener that is called when the current
     * animation value changed in this animation instance.
     */
    addListener(listener: AnimationListener): void;
    /**
     * Deregisters the given listener that is called when the current
     * animation value changed in this animation instance.
     */
    removeListener(listener: AnimationListener): void;
    /**
     * Registers the given status listener that is called when the current
     * animation status value changed in this animation instance.
     */
    addStatusListener(listener: AnimationStatusListener): void;
    /**
     * Deregisters the given status listener that is called when the current
     * animation status value changed in this animation instance.
     */
    removeStatusListener(listener: AnimationStatusListener): void;
    /** Notifies a new value updated for a registered animation listeners. */
    notifyListeners(value: number): void;
    /** Notifies a new status updated for a registered animation status listeners. */
    notifyStatusListeners(status: AnimationStatus): void;
}

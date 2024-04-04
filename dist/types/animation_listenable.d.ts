import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./type";
/** This abstract class implements an animation related listener. */
export declare abstract class AnimationListenable extends Animatable {
    private listeners;
    private statusListeners;
    addListener(listener: AnimationListener): void;
    removeListener(listener: AnimationListener): void;
    addStatusListener(listener: AnimationStatusListener): void;
    removeStatusListener(listener: AnimationStatusListener): void;
    /** Notifies a new value updated for a registered animation listeners. */
    notifyListeners(value: number): void;
    /** Notifies a new status updated for a registered animation status listeners. */
    notifyStatusListeners(status: AnimationStatus): void;
}

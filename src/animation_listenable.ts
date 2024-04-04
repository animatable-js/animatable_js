import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./type";

/** This abstract class implements an animation related listener. */
export abstract class AnimationListenable extends Animatable {
    private listeners: AnimationListener[] = [];
    private statusListeners: AnimationStatusListener[] = [];

    addListener(listener: AnimationListener) {
        console.assert(!this.listeners.includes(listener), "Already a given listener does exist.");
        this.listeners.push(listener);
    }

    removeListener(listener: AnimationListener) {
        console.assert(this.listeners.includes(listener), "Already a given listener does not exist.");
        this.listeners = this.listeners.filter(l => l != listener);
    }

    addStatusListener(listener: AnimationStatusListener) {
        console.assert(!this.statusListeners.includes(listener), "Already a given status listener does exist.");
        this.statusListeners.push(listener);
    }

    removeStatusListener(listener: AnimationStatusListener) {
        console.assert(this.statusListeners.includes(listener), "Already a given status listener does not exist.");
        this.statusListeners = this.statusListeners.filter(l => l != listener);
    };

    /** Notifies a new value updated for a registered animation listeners. */
    notifyListeners(value: number) {
        this.listeners.forEach(l => l(value));
    }

    /** Notifies a new status updated for a registered animation status listeners. */
    notifyStatusListeners(status: AnimationStatus) {
        this.statusListeners.forEach(l => l(status));
    }
}
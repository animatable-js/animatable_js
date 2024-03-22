import { Animatable, AnimationStatus } from "./animatable";
import { AnimationListener, AnimationStatusListener } from "./type";

class Animatoin extends Animatable {
    private listeners: AnimationListener[] = [];
    private statusListeners: AnimationStatusListener[] = [];

    private status: AnimationStatus = AnimationStatus.NONE;

    override addListener(listener: AnimationListener) {
        console.assert(!this.listeners.includes(listener), "Already a given listener does exist.");
        this.listeners.push(listener);
    }

    override removeListener(listener: AnimationListener) {
        console.assert(this.listeners.includes(listener), "Already a given listener does not exist.");
        this.listeners = this.listeners.filter(l => l != listener);
    }

    override addStatusListener(listener: AnimationStatusListener) {
        console.assert(!this.statusListeners.includes(listener), "Already a given status listener does exist.");
        this.statusListeners.push(listener);
    }

    override removeStatusListener(listener: AnimationStatusListener) {
        console.assert(this.statusListeners.includes(listener), "Already a given status listener does not exist.");
        this.statusListeners = this.statusListeners.filter(l => l != listener);
    };

    dispose() {
        
    }
}
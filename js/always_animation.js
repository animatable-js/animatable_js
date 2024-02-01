import { Animatable, AnimationController } from "./animation_controller.js";
import { Cubic } from "./cubic.js";



// This is value of an animation extent does not exist.
export class AlwaysAnimation extends Animatable {
    /**
     * @param {number} duration
     * @param {number} initialValue 
     * @param {Cubic} curve - is nullable
     */
    constructor(
        duration,
        initialValue,
        curve,
    ) {
        super();

        this.startValue /** @type {number} */ = initialValue;
        this.duration   /** @type {number} */ = duration || 0;
        
        /** @type {Cubic} */
        this.curve /** @type {Cubic} */ = curve;
        
        this.listeners = [];
        this.statusListeners = [];
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners.remove(callback);
    }
    
    addStatusListener(callback) {
        this.statusListeners.push(callback);
    }

    removeStatusListener(callback) {
        this.statusListeners.remove(callback);
    }

    notifyListeners(value) {
        if (this.curve == null) {
            this.listeners.forEach(listener => listener(value));
            return;
        }

        // 나중에 curve가 고려되어 코드가 구현되어야 함.
    }

    notifyStatusListeners(status) {
        this.statusListeners.forEach(listener => listener(status));
    }

    /**
     * @param {number} target 
     */
    animateTo(target) {
        console.log(this.startValue);
        this.activeController?.dispose();
        this.activeController = new AnimationController(
            this.duration,
            this.startValue,
            this.startValue,
            target,
            true, // is absolute duration
        );
        this.activeController.addListener(this.notifyListeners.bind(this));
        this.activeController.addStatusListener(this.notifyStatusListeners.bind(this));
        this.activeController.forward();
    }
}
import { AnimationController } from "./animation_controller.js";
import { CurvedAnimation } from "./curved_animation.js";



export class CubicPoint {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
        
        if (isNaN(this.x)
         || isNaN(this.y)) {
            throw new Error("Points were not given correctly in this cubic point class.");
        }
    }
    
    /**
     * Interpolate between this point and given point to find a specific position.
     * 
     * @param {CubicPoint} other
     * @param {number} t - `from 0 to 1`
     * 
     * @returns {CubicPoint}
     */
    interpolate(other, t) {
        const x = this.x + (other.x - this.x) * t;
        const y = this.y + (other.y - this.y) * t;

        return new CubicPoint(x, y);
    }
}

// The [Cubic] class implements bezier curves.
// 
export class Cubic {
    /**
     * @param {number} x1 - Control Point.
     * @param {number} y1 - Control Point.
     * @param {number} x2 - Control Point.
     * @param {number} y2 - Control Point.
     * @param {CubicPoint} start
     * @param {CubicPoint} end
     * @param {number} errorBound - Estimated Error Range.
     */
    constructor(
        x1, y1,
        x2, y2,
        start = new CubicPoint(0, 0),
        end   = new CubicPoint(1, 1),
        errorBound = 0.0001,
    ) {
        /** @type {CubicPoint} */ this.p1 = start;
        /** @type {CubicPoint} */ this.p2 = new CubicPoint(x1, y1);
        /** @type {CubicPoint} */ this.p3 = new CubicPoint(x2, y2);
        /** @type {CubicPoint} */ this.p4 = end;

        /** @type {number} */
        this.errorBound = errorBound;

        if (this.p1 instanceof CubicPoint == false
         || this.p2 instanceof CubicPoint == false
         || this.p3 instanceof CubicPoint == false
         || this.p4 instanceof CubicPoint == false) {
            throw new Error("Cubic points were not given correctly in this cubic class.");
        }
    }

    /**
     * @returns {Cubic}
     */
    get reversed() {
        return new Cubic(
            1 - this.p2.x,
            1 - this.p2.y,
            1 - this.p3.x,
            1 - this.p3.y,
            this.p1,
            this.p4,
            this.errorBound
        );
    }

    /**
     * De Casteljau's algorithm was used.
     * 
     * for detail refer to https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm,
     *                     https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A7%80%EC%97%90_%EA%B3%A1%EC%84%A0
     * 
     * @param {number} t - Time `from 0 to 1`
     * @returns {CubicPoint}
     */
    at(t) {
        const p1 = this.p1;
        const p2 = this.p2;
        const p3 = this.p3;
        const p4 = this.p4;

        const p1ToP2 = p1.interpolate(p2, t);
        const p2ToP3 = p2.interpolate(p3, t);
        const p3ToP4 = p3.interpolate(p4, t);

        const a = p1ToP2.interpolate(p2ToP3, t);
        const b = p2ToP3.interpolate(p3ToP4, t);
        
        return a.interpolate(b, t);
    }

    /**
     * @param {number} t - Time `from 0 to 1`
     * @returns {number}
     */
    transform(t) {
        if (t < 0 || t > 1) {
            throw new Error("In the transform function of the Cubic, t must be given from 0 to 1.");
        }
        if (t == 0) return this.p1.y;
        if (t == 1) return this.p4.y;

        let start = 0;
        let end   = 1;
        
        // Use dichotomy to obtain estimate point.
        while(true) {
            const midpoint = (start + end) / 2;
            const estPoint = this.at(midpoint); // Estimate Point

            if (Math.abs(t - estPoint.x) < this.errorBound) {
                return estPoint.y;
            }
            
            estPoint.x < t
                ? start = midpoint
                : end   = midpoint;
        }
    }

    /**
     * @param {number} duration 
     * @param {number} initialValue 
     * @param {number} lowerValue 
     * @param {number} upperValue 
     * @param {number} isAbsoluteDuration 
     * @returns {CurvedAnimation}
     */
    createAnimation(
        duration,
        initialValue,
        lowerValue,
        upperValue,
        isAbsoluteDuration,
    ) {
        return new CurvedAnimation(new AnimationController(
            duration,
            initialValue,
            lowerValue,
            upperValue,
            isAbsoluteDuration
        ), this)
    }

    toString() {
        return `Cubic(${this.p2.x}, ${this.p2.y}, ${this.p3.x}, ${this.p3.y})`;
    }
}

// Refer to https://easings.net for details.
export const Curve = {
    Linear:         new Cubic(0, 0, 1, 1),
    Ease:           new Cubic(0.25, 0.1, 0.25, 1),
    EaseIn:         new Cubic(0.42, 0, 1, 1),
    EaseOut:        new Cubic(0, 0, 0.58, 1),
    EaseInOut:      new Cubic(0.42, 0, 0.58, 1),
    EaseInSine:     new Cubic(0.12, 0, 0.39, 0),
    EaseOutSine:    new Cubic(0.61, 1, 0.88, 1),
    EaseInQuad:     new Cubic(0.11, 0, 0.5, 0),
    EaseOutQuad:    new Cubic(0.5, 1, 0.89, 1),
    EaseInOutQuad:  new Cubic(0.45, 0, 0.55, 1),
    EaseInOutSine:  new Cubic(0.37, 0, 0.63, 1),
    EaseInCubic:    new Cubic(0.32, 0, 0.67, 0),
    EaseOutCubic:   new Cubic(0.33, 1, 0.68, 1),
    EaseInOutCubic: new Cubic(0.65, 0, 0.35, 1),
    EaseInQuart:    new Cubic(0.5, 0, 0.75, 0),
    EaseOutQuart:   new Cubic(0.25, 1, 0.5, 1),
    EaseInOutQuart: new Cubic(0.76, 0, 0.24, 1),
    EaseInQuint:    new Cubic(0.64, 0, 0.78, 0),
    EaseOutQuint:   new Cubic(0.22, 1, 0.36, 1),
    EaseInOutQuint: new Cubic(0.83, 0, 0.17, 1),
    EaseInExpo:     new Cubic(0.7, 0, 0.84, 0),
    EaseOutExpo:    new Cubic(0.16, 1, 0.3, 1),
    EaseInOutExpo:  new Cubic(0.87, 0, 0.13, 1),
    EaseInCirc:     new Cubic(0.55, 0, 1, 0.45),
    EaseOutCirc:    new Cubic(0, 0.55, 0.45, 1),
    EaseInOutCirc:  new Cubic(0.85, 0, 0.15, 1),
    EaseInBack:     new Cubic(0.36, 0, 0.66, -0.56),
    EaseOutBack:    new Cubic(0.34, 1.56, 0.64, 1),
    EaseInOutBack:  new Cubic(0.68, -0.6, 0.32, 1.6),
}
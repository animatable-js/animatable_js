import { Animation } from "./animation";

/** This class provides bilinear-interpolation feature. */
export class CubicPoint {
    constructor(
        public x: number,
        public y: number
    ) { }
    
    /** Interpolate between this point and given point to find a specific position. */
    lerp(other: CubicPoint, t: number): CubicPoint {
        const x = this.x + (other.x - this.x) * t;
        const y = this.y + (other.y - this.y) * t;

        return new CubicPoint(x, y);
    }
}

/** This class implements bezier curves. */
export class Cubic {
    p1: CubicPoint;
    p2: CubicPoint;
    p3: CubicPoint;
    p4: CubicPoint;

    constructor(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        start = new CubicPoint(0, 0),
        end   = new CubicPoint(1, 1),
        public errorBound: number = 0.0001,
    ) {
        this.p1 = start;
        this.p2 = new CubicPoint(x1, y1);
        this.p3 = new CubicPoint(x2, y2);
        this.p4 = end;
    }

    /** Returns a flipped cubic instance of this cubic. */
    get flipped(): Cubic {
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
     */
    at(t: number): CubicPoint {
        const p1 = this.p1;
        const p2 = this.p2;
        const p3 = this.p3;
        const p4 = this.p4;

        const p1ToP2 = p1.lerp(p2, t);
        const p2ToP3 = p2.lerp(p3, t);
        const p3ToP4 = p3.lerp(p4, t);

        const a = p1ToP2.lerp(p2ToP3, t);
        const b = p2ToP3.lerp(p3ToP4, t);
        
        return a.lerp(b, t);
    }

    transform(t: number) {
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

    /** Returns a created `Animation` instance this cubic-based. */
    createAnimation(duration: number): Animation {
        return new Animation(duration, this);
    }

    /**
     * Returns instance of Cubic by given cubic static variable
     * name of CSS.
     */
    static var(name: string, scope: HTMLElement): Cubic {
        const style = window.getComputedStyle(scope || document.documentElement);
        const value = style.getPropertyValue(name).trim();
        if (value === "") {
            throw new Error("The cubic format value of the given name could not be found.");
        }
        
        return this.parse(value);
    }

    /** Returns instance of Cubic by given cubic format string. */
    static parse(str: string): Cubic {
        const regex = /([0-9.]+)/g;
        const points = str.match(regex).map(Number);
        if (points.length != 4) {
            throw new Error("The given [str] format is invalid. (ex: cubic-bezier(0,1,0,1))");
        }

        return new Cubic(
            points[0], // x1
            points[1], // y1
            points[2], // x2
            points[3], // y2
        );
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
import { Color } from "./color";

/** This class provides linear-interpolation feature. */
export abstract class Tween<T> {

    /** Returns the interpolated value by a given point. */
    abstract transform(t: number): T;
}

/** This class provides linear-interpolation for number type. */
export class NumberTween extends Tween<number> {
    constructor(public begin: number, public end: number) {
        super();
    }

    transform(t: number): number {
        return this.begin + (this.end - this.begin) * t;
    }
}

/** This class provides linear-interpolation for color type. */
export class ColorTween extends Tween<Color> {
    constructor(public begin: Color, public end: Color) {
        super();
    }
    
    transform(t: number): Color {
        const begin = this.begin;
        const end   = this.end;
        const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;

        return new Color(
            lerp(begin.red, end.red, t),
            lerp(begin.green, end.green, t),
            lerp(begin.blue, end.blue, t),
            lerp(begin.alpha, end.alpha, t)
        );
    }
}
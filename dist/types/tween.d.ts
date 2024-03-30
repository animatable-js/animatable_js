import { Color } from "./color";
/** This class provides linear-interpolation feature. */
export declare abstract class Tween<T> {
    /** Returns the interpolated value by a given point. */
    abstract transform(t: number): T;
}
/** This class provides linear-interpolation for number type. */
export declare class NumberTween extends Tween<number> {
    begin: number;
    end: number;
    constructor(begin: number, end: number);
    transform(t: number): number;
}
/** This class provides linear-interpolation for color type. */
export declare class ColorTween extends Tween<Color> {
    begin: Color;
    end: Color;
    constructor(begin: Color, end: Color);
    transform(t: number): Color;
}

import { Color } from "./color";
/** This class provides linear-interpolation feature. */
export declare abstract class Tween<T> {
    abstract transform(t: number): T;
}
export declare class NumberTween extends Tween<number> {
    begin: number;
    end: number;
    constructor(begin: number, end: number);
    transform(t: number): number;
}
export declare class ColorTween extends Tween<Color> {
    begin: Color;
    end: Color;
    constructor(begin: Color, end: Color);
    transform(t: number): Color;
}

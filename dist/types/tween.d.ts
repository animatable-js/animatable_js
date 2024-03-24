export declare abstract class Tween<T> {
    abstract transform(t: number): T;
}
export declare class NumberTween extends Tween<number> {
    a: number;
    b: number;
    constructor(a: number, b: number);
    transform(t: number): number;
}

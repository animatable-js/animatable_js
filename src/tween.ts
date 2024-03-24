
export abstract class Tween<T> {
    abstract transform(t: number): T;
}

export class NumberTween extends Tween<number> {
    constructor(public a: number, public b: number) {
        super();
    }

    transform(t: number): number {
        throw new Error("Method not implemented.");
    }
}
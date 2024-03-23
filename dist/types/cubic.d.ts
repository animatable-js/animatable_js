export declare class CubicPoint {
    x: number;
    y: number;
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x: number, y: number);
    /** Interpolate between this point and given point to find a specific position. */
    lerp(other: CubicPoint, t: number): CubicPoint;
}
/** This class implements bezier curves. */
export declare class Cubic {
    errorBound: number;
    p1: CubicPoint;
    p2: CubicPoint;
    p3: CubicPoint;
    p4: CubicPoint;
    constructor(x1: number, y1: number, x2: number, y2: number, start?: CubicPoint, end?: CubicPoint, errorBound?: number);
    get flipped(): Cubic;
    /**
     * De Casteljau's algorithm was used.
     *
     * for detail refer to https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm,
     *                     https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A7%80%EC%97%90_%EA%B3%A1%EC%84%A0
     *
     * @param {number} t - Time `from 0 to 1`
     */
    at(t: number): CubicPoint;
    /** @param {number} t - Time `from 0 to 1` */
    transform(t: number): number;
    /** TODO: Must be develop createAnimation() */
    /**
     * Returns instance of Cubic by given cubic static variable name of CSS.
     */
    static var(name: string, scope: HTMLElement): Cubic;
    /**
     * Returns instance of Cubic by given cubic format string.
     */
    static parse(str: string): Cubic;
    toString(): string;
}
export declare const Curve: {
    Linear: Cubic;
    Ease: Cubic;
    EaseIn: Cubic;
    EaseOut: Cubic;
    EaseInOut: Cubic;
    EaseInSine: Cubic;
    EaseOutSine: Cubic;
    EaseInQuad: Cubic;
    EaseOutQuad: Cubic;
    EaseInOutQuad: Cubic;
    EaseInOutSine: Cubic;
    EaseInCubic: Cubic;
    EaseOutCubic: Cubic;
    EaseInOutCubic: Cubic;
    EaseInQuart: Cubic;
    EaseOutQuart: Cubic;
    EaseInOutQuart: Cubic;
    EaseInQuint: Cubic;
    EaseOutQuint: Cubic;
    EaseInOutQuint: Cubic;
    EaseInExpo: Cubic;
    EaseOutExpo: Cubic;
    EaseInOutExpo: Cubic;
    EaseInCirc: Cubic;
    EaseOutCirc: Cubic;
    EaseInOutCirc: Cubic;
    EaseInBack: Cubic;
    EaseOutBack: Cubic;
    EaseInOutBack: Cubic;
};

export declare class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    constructor(red: number, green: number, blue: number, alpha?: number);
    /** Returns hex color code string by this instance of Color. */
    toHex(): string;
    /** Returns instance of Color by given color static variable name of CSS. */
    static var(name: string, scope: HTMLElement): Color;
    /** Returns instance of Color by given hex color format string. */
    static parse(str: string): Color;
    toString(): string;
}

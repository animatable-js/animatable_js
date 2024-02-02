import { Color } from "./color.js";



export class ColorTween {
    /**
     * @param {Color} start 
     * @param {Color} end 
     */
    constructor(
        start,
        end,
    ) {
        this.start = start;
        this.end = end;
        
        // is type testing.
        if (
            start instanceof Color == false
         || end   instanceof Color == false
        ) {
            throw "";
        }
    }
    
    /**
     * @param {number} t
     * @returns {Color} 
     */
    transform(t) {
        if (t < 0) return this.start;
        if (t > 1) return this.end;

        const start = this.start;
        const end   = this.end;
        const interpolate = (a, b, t) => a + (b - a) * t;

        return new Color(
            interpolate(start.red, end.red, t),
            interpolate(start.green, end.green, t),
            interpolate(start.blue, end.blue, t),
            interpolate(start.alpha, end.alpha, t)
        );
    }
}
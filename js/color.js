


export class Color {
    /**
     * @param {number} red 
     * @param {number} green 
     * @param {number} blue 
     */
    constructor(
        red,
        green,
        blue,
        alpha = 1,
    ) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;

        // is type testing.
        if (
            isNaN(this.red)
         || isNaN(this.green)
         || isNaN(this.blue)
         || isNaN(this.alpha)) {
            throw new Error("The color values given is not a number.");
        }

        // is overflow testing for value extent.
        if (
            this.red   > 255 || this.red   < 0
         || this.green > 255 || this.green < 0
         || this.blue  > 255 || this.blue  < 0
         || this.alpha > 1   || this.alpha < 0
        ) {
            throw new Error("The color values given is extent overflowed. ex: new Color(0~255, 0~255, 0~255, 0~1)");
        }
    }

    /**
     * @returns {string}
     */
    toHex() {
        const hex = (value) => {
            const /** @type {string} */ result = Math.round(value).toString(16);
            
            if (result.length == 1) {
                return '0'+result;
            }
            return result;
        }

        return `#${hex(this.red)}${hex(this.green)}${hex(this.blue)}${hex(this.alpha * 255)}`;
    }

    /**
     * @param {string} str 
     * @returns {Color}
     */
    static byHex(str) {
        
    }

    toString() {
        return this.toHex();
    }
}
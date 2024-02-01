


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
     * Returns instance of Color by given hex color code string.
     * 
     * @param {string} str 
     * @returns {Color}
     */
    static parse(str) {
        // Removes unnecessary the prefix '#' from the given string.
        const hexs = str.startsWith("#") ? str.slice(1, str.length) : str;
        
        let red   = 0;
        let green = 0;
        let blue  = 0;
        let alpha = hexs.length == 8 ? parseInt(hexs.slice(6, 8), 16) : 1;
        if (hexs.length == 6
         || hexs.length == 8) {
            red   = parseInt(hexs.slice(0, 2), 16);
            green = parseInt(hexs.slice(2, 4), 16);
            blue  = parseInt(hexs.slice(4, 6), 16);
        } else {
            throw new Error("The given string is unvalid. (ex: #202020 or #202020FF)");
        }

        return new Color(red, green, blue, alpha / 255);
    }

    toString() {
        return this.toHex();
    }
}
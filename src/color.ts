
export class Color {
    constructor(
        public red: number,
        public green: number,
        public blue: number,
        public alpha = 1,
    ) {
        // is overflow testing for value extent.
        if (this.red   > 255 || this.red   < 0
         || this.green > 255 || this.green < 0
         || this.blue  > 255 || this.blue  < 0
         || this.alpha > 1   || this.alpha < 0) {
            throw new Error("The color values given is extent overflowed. ex: new Color(0~255, 0~255, 0~255, 0~1)");
        }
    }

    /** Returns hex color code string by this instance of Color. */
    toHex(): string {
        const hex = (value: number) => {
            const result: string = Math.round(value).toString(16);
            
            if (result.length == 1) {
                return '0'+result;
            }
            return result;
        }

        return `#${hex(this.red)}${hex(this.green)}${hex(this.blue)}${hex(this.alpha * 255)}`;
    }

    /** Returns instance of Color by given color static variable name of CSS. */
    static var(name: string, scope: HTMLElement): Color {
        const style = window.getComputedStyle(scope || document.documentElement);
        const value = style.getPropertyValue(name).trim();
        if (value === "") {
            throw new Error("The hex color format of the given name could not be found.");
        }

        return this.parse(value);
    }

    /** Returns instance of Color by given hex color format string. */
    static parse(str: string): Color {
        // Removes unnecessary the prefix '#' from the given string.
        const hexs = str.startsWith("#") ? str.slice(1, str.length) : str;

        let red   = 0;
        let green = 0;
        let blue  = 0;
        let alpha = hexs.length == 8 ? parseInt(hexs.slice(6, 8), 16) / 255 : 1;
        if (hexs.length == 6
         || hexs.length == 8) {
            red   = parseInt(hexs.slice(0, 2), 16);
            green = parseInt(hexs.slice(2, 4), 16);
            blue  = parseInt(hexs.slice(4, 6), 16);
        } else {
            throw new Error("The given string is unvalid. (ex: #202020 or #202020FF)");
        }

        return new Color(red, green, blue, alpha);
    }

    toString() {
        return this.toHex();
    }
}



export class CubicPoint {
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
        
        if (isNaN(this.x)
         || isNaN(this.x)) {
            throw "Points were not given correctly in this cubic point class.";
        }
    }
    
    /**
     * Interpolate between this point and given point to find a specific position.
     * 
     * @param {CubicPoint} p2
     * @param {number} p2 - `from 0 to 1`
     * 
     * @returns {CubicPoint}
     */
    interpolate(p2, percent) {
        const x = this.x + percent * (p2.x - this.x);
        const y = this.y + percent * (p2.y - this.y);

        return new CubicPoint(x, y);
    }
}

// The [Cubic] class implements bezier curves.
// 
export class Cubic {
    /**
     * @param {CubicPoint} p1 - Control Point.
     * @param {CubicPoint} p2 - Control Point.
     */
    constructor(p1, p2) {
        /** @type {CubicPoint} */ this.p1 = p1;
        /** @type {CubicPoint} */ this.p2 = p2;

        if (this.p1 instanceof CubicPoint == false
         || this.p2 instanceof CubicPoint == false) {
            throw "Cubic points were not given correctly in this cubic class.";
        }
    }

    // Returns a point that corresponds to a given index.
    at(index) { return this.points[index]; }

    /**
     * De Casteljau's algorithm was used.
     * 
     * for detail refer to https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm,
     *                     https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A7%80%EC%97%90_%EA%B3%A1%EC%84%A0
     * 
     * @param {number} t
     */
    calculateCubic(t) {
        
    }

    /**
     * @param {number} value - Time `from 0 to 1`
     */
    to(value) {
        console.log(this.p1.interpolate(this.p2, 0.5));
    }
}



// The [Cubic] class implements bezier curves.
// 
class Cubic {
    /**
     * @param {...number} point - Control Points
     */
    constructor(...point) {
        this.points = point
    }

    // Returns a point that corresponds to a given index.
    at(index) { return this.points[index]; }

    /**
     * De Casteljau's algorithm was used.
     * 
     * for detail refer to https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm,
     *                     https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A7%80%EC%97%90_%EA%B3%A1%EC%84%A0
     */
    calculateCubic() {

    }
}
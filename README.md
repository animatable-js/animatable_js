# Make an animation in Javascript
This package allows easy and light implementation of linear or curved animation in javascript.
`Especially suitable in a development environment on web components or canvas.`

## Install by npm
Type and execute the this command in terminal.

```
npm install animatable-js
```

[한국어로 보기](README.ko.md)

> Performing this task resource costs significantly less than rendering.
> 
> There's no need to handle it on a separate thread. The reason why lag occurs due to numerous animation effects is because countless elements are re-rendered nearly 60 times per second.

> This is package mainly used when using canvas element, which is controlled using js, an environment where css is not available.

## How to make linear animation?
refer to this code!

### With clamping.
```js
const controller = new AnimationController(
  duration,          // milliseconds
  initialValue,      // lowerValue(0) ~ upperValue(1)
  lowerValue,        // 0
  upperValue,        // 1
  isAbsoluteDuration // ... Refer class internal comment for more details.
);

controller.addListener(value => {
  console.log(value);
});
controller.forward();
```

## How to make Curved animation?
refer to this code!
```js
const controller = new CurvedAnimation(duration, curve, parent);
// ... skip
```

### What is a curve?
In this package, the curve means an instance of a cubic object.

### What is a cubic? (cubic-bezier)
The cubic animation provides a feature where the rate of change in animation values is not constant, but accelerates or decelerates over time.

> refer to [Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) for detail.

### How to make cubic object?
refer to this code!
```js
const curve = new Cubic(x1, y1, x1, y2, start?, end?);
// ... skip
```
![cubic](https://github.com/MTtankkeo/js_animatable/assets/122026021/47836ae7-60c6-4198-9ea5-acc7837f0999)

> going to [cubic-bezier.com](https://cubic-bezier.com) for making.

## How to make color tween animation?
Please utilize the `Color` and `ColorTween` class!

```js
const red = new Color(255, 0, 0, alpha); // or new Color.parse("FF0000")
const blue = new Color(0, 0, 255, alpha); // or new Color.parse("0000FF")

// new ColorTween(start, end);
const colorTween = new ColorTween(red, blue);

animation.addListener(value => {
  const color = colorTween.transform(value);
  // ... skip
});
```

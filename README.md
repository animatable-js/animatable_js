# Implement an animation in Javascript
This package allows easy and light implementation of linear or curved animation in javascript.
`Especially suitable in a development environment on web components or canvas.`

[한국어로 보기](README.ko.md)

> Performing this task resource costs significantly less than rendering.
> 
> There's no need to handle it on a separate thread. The reason why lag occurs due to numerous animation effects is because countless elements are re-rendered nearly 60 times per second.

> This is package mainly used when using canvas element, which is controlled using js, an environment where css is not available.

## Install by npm
Type and execute the this command in terminal.
```
npm install animatable-js
```

## How to preload JS modules?
Write this code in the top-level HTML file `ex: index.html`.

> Please modify the paths as necessary to match development environment.

```html
<link rel="modulepreload" href="./node_modules/animatable-js/lib.js">
<link rel="modulepreload" href="./node_modules/animatable-js/animation_controller.js">
<link rel="modulepreload" href="./node_modules/animatable-js/animation.js">
<link rel="modulepreload" href="./node_modules/animatable-js/color_tween.js">
<link rel="modulepreload" href="./node_modules/animatable-js/color.js">
<link rel="modulepreload" href="./node_modules/animatable-js/cubic.js">
<link rel="modulepreload" href="./node_modules/animatable-js/curved_animation.js">
<link rel="modulepreload" href="./node_modules/animatable-js/ticker.js">
```

## How to make linear animation?
refer to this code!

### With clamping.
```js
const controller = new AnimationController(
  duration,           // milliseconds
  initialValue?,      // lowerValue(0) ~ upperValue(1)
  lowerValue?,        // 0
  upperValue?,        // 1
  isAbsoluteDuration? // ... Refer class internal comment for more details.
);

controller.addListener(value => {
  console.log(value);

  // Relative value are always returned from 0 to 1.
  console.log(controller.relValue);

  // Progress value are always returned from 0 to 1, and no subtraction.
  // This always means that the value increases from 0 to 1.
  console.log(controller.progressValue);
});
controller.addStatusListener(status => {
  console.log(status);
});
controller.forward(delay?); // or controller.backward(delay?)

// for move to target.
controller.animateTo(0.5);

// for repeat animation.
controller.repeat(startDelay?, cycleDelay?);
```

### Constants of Animation Status
refer to `animation_controller/AnimationStatus` for detail.

| Name | Value
| ------ | ------
| None | "none"
| FORWARD | "forward"
| FORWARDED | "forwarded"
| BACKWARD | "backward"
| BACKWARDED | "backwarded"

## How to make curved animation?
refer to this code!
```js
// Where parent means an instance of the [AnimationController] object.
const controller = new CurvedAnimation(parent, curve = Curve.Ease);

// or new Cubic(x1, y1, x2, y2).createAnimation(...)
const controller = Curve.Ease.createAnimation(
  duration,
  initialValue?,
  lowerValue?, // 0
  upperValue?, // 1
  isAbsoluteDuration? // false
);

// ... skip
```

### What is a curve?
In this package, the curve means an instance of a cubic object.

> Can use the Cubic instances that are provided by default in Curve of `cubic.js`.
```js
// ... cubic.js
export const Curve = {
    Linear:         new Cubic(0, 0, 1, 1),
    Ease:           new Cubic(0.25, 0.1, 0.25, 1),
    EaseIn:         new Cubic(0.42, 0, 1, 1),
    EaseOut:        new Cubic(0, 0, 0.58, 1),
    EaseInOut:      new Cubic(0.42, 0, 0.58, 1),
    EaseInSine:     new Cubic(0.12, 0, 0.39, 0),
    EaseOutSine:    new Cubic(0.61, 1, 0.88, 1),
    EaseInQuad:     new Cubic(0.11, 0, 0.5, 0),
    EaseOutQuad:    new Cubic(0.5, 1, 0.89, 1),
    EaseInOutQuad:  new Cubic(0.45, 0, 0.55, 1),
    EaseInOutSine:  new Cubic(0.37, 0, 0.63, 1),
    EaseInCubic:    new Cubic(0.32, 0, 0.67, 0),
    EaseOutCubic:   new Cubic(0.33, 1, 0.68, 1),
    EaseInOutCubic: new Cubic(0.65, 0, 0.35, 1),
    EaseInQuart:    new Cubic(0.5, 0, 0.75, 0),
    EaseOutQuart:   new Cubic(0.25, 1, 0.5, 1),
    EaseInOutQuart: new Cubic(0.76, 0, 0.24, 1),
    EaseInQuint:    new Cubic(0.64, 0, 0.78, 0),
    EaseOutQuint:   new Cubic(0.22, 1, 0.36, 1),
    EaseInOutQuint: new Cubic(0.83, 0, 0.17, 1),
    EaseInExpo:     new Cubic(0.7, 0, 0.84, 0),
    EaseOutExpo:    new Cubic(0.16, 1, 0.3, 1),
    EaseInOutExpo:  new Cubic(0.87, 0, 0.13, 1),
    EaseInCirc:     new Cubic(0.55, 0, 1, 0.45),
    EaseOutCirc:    new Cubic(0, 0.55, 0.45, 1),
    EaseInOutCirc:  new Cubic(0.85, 0, 0.15, 1),
    EaseInBack:     new Cubic(0.36, 0, 0.66, -0.56),
    EaseOutBack:    new Cubic(0.34, 1.56, 0.64, 1),
    EaseInOutBack:  new Cubic(0.68, -0.6, 0.32, 1.6),
}
```

### What is a cubic? (cubic-bezier)
The cubic animation provides a feature where the rate of change in animation values is not constant, but accelerates or decelerates over time.

> refer to [Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) for detail.

### How to make cubic object?
refer to this code!
```js
const curve = new Cubic(x1, y1, x2, y2, start?, end?);
// ... skip
```
![curve](https://github.com/MTtankkeo/js_animatable/assets/122026021/1c22b58c-481f-47f2-a8e4-cc7b03672f86)

> going to [cubic-bezier.com](https://cubic-bezier.com) for making.

### How to flip cubic?
```js
const easeFlipped = Curve.Ease.flipped;
```

## How to make color tween animation?
Please utilize the `Color` and `ColorTween` class!

```js
// or new Color.parse("#FF0000"); (is skipable prefix #)
const red  = new Color(255, 0, 0, alpha?);
const blue = new Color.var("--blue", scope?);

// new ColorTween(start, end);
const colorTween = new ColorTween(red, blue);

animation.addListener(value => {
  const color = colorTween.transform(value);
  // ... skip
});
```

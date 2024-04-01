# Implement an animation in Javascript

This package allows easy and light implementation of linear or curved animation in javascript. `Especially suitable in a development environment on web components or canvas`

The resource of this package amounts to `3kb` when compressed with gzip under the assumption of using all features.

> This is package mainly used when using canvas element, which is controlled using js, an environment where css is not available.

## High Performance
`10,000` countless animations can be implemented in a runtime environment.

![ezgif-6-ddcf0f5b58](https://github.com/MTtankkeo/js_animatable/assets/122026021/297f5d05-4d30-4ef4-99f3-947350e05d0b)


## Install by npm
To install this package in your project, enter the following command.

> When you want to update this package, enter `npm update animable-js --save` in the terminal to run it.

```
npm install animatable-js
```

## How to make an animation?
The code below shows how to use the most commonly used class, a `Animation` object.

```js
import { Animation, AnimationStatus } from "animable-js";

const animation = new Animation(duration, curve?);
animation.addListener(value => {
    // A current animation value.
    console.log(value);

    // This controller is raw animation controller that
    // the [Animation] object dependence on.
    const parent = animation.parent;

    // Relative value are always returned from 0 to 1.
    console.log(parent.relValue);

    // Progress value are always returned from 0 to 1, and no subtraction.
    // This always means that the value increases from 0 to 1.
    console.log(parent.progressValue)
});
animation.addStatusListener(status => {
   if (status == AniamtionStatus.FORWARDED) console.log("is forwarded");
   if (status == AnimationStatus.BACKWARDED) console.log("is backwarded");
});

// This animation value will smoothly transition from 0 to 1.
animation.animateTo(1);
```

## Constants of Animation Status
refer to animatable.ts/AnimationStatus for detail.

| Name | Value
| ------ | ------
| NONE | 0
| FORWARD | 1
| FORWARDED | 2
| BACKWARD | 3
| BACKWARDED | 4

## How to make curve-animation?
```js
const a = new Animation(duration, Curve.Ease);
const b = new Cubic(x1, y1, x2, y2).createAnimation(duration);
const c = Curve.Ease.createAnimation(duration);
```

## What is a curve?
In this package, the curve means an instance of a cubic object.

> Can use the Cubic instances that are provided by default in Curve of cubic.ts

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
```js
const curve = new Cubic(x1, y1, x2, y2, start?, end?);

const curve = Cubic.var("--variable-name");
const curve = Cubic.parse("cubic-bezier(x1,y1,x2,y2)");
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

## How to use raw-animation?
The code below shows how to use the class `AnimationController`, which is the base and foundation for implementing the animation.

> I decided to say this is a raw animation-controller.

```js
const controller = new AnimationController(
    duration, // Milliseconds
    lowerValue = 0,
    upperValue = 1
);

controller.addListener(value => ...);
controller.addStatusListener(status => ...);

console.log(controller.value);
console.log(controller.relValue);
console.log(controller.progressValue);
```

## What is Ticker?
Provides the ability to perform want tasks when the frame is updated, and measures the time interval between frames and is used to make smooth animation.

> Used to define a elapsed duration between a previous frame and the current frame when a frame updated.

```js
// The elapsed between the previous frame and the current frame is given.
const activeTicker = new Ticker(deltaElpased => {
  console.log(deltaElpased);
});

// Dispose or clean up all relevant tasks and instances on memory.
activeTicker.dispose();
```

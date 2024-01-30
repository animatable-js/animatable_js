# Use animation in Javascript
This package allows easy implementation of linear or curved animation in javascript.

`Especially suitable in a development environment on web components or canvas.`

> Performing this task costs significantly less than rendering.
> 
> There's no need to handle it on a separate thread. The reason why lag occurs due to numerous animation effects is because countless elements are re-rendered nearly 60 times per second.

## How to make linear animation?
refer to this code!
```js
const controller = new AnimationController(
  duration,
  initialValue,
  lowerValue,
  upperValue,
  isAbsoluteDuration
);

controller.addListener(value => {
  console.log(value);
}
controller.forward();
```

## How to make Curved animation?
refer to this code!
```js
const controller = new CurvedAnimation(duration, curve, parent);
// ... skip
```

### What is a curve?
Curve means an instance of a cubic object.

### What is a cubic?




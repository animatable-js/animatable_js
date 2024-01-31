# Make an animation in Javascript
This package allows easy implementation of linear or curved animation in javascript.
`Especially suitable in a development environment on web components or canvas.`

> Performing this task resource costs significantly less than rendering.
> 
> There's no need to handle it on a separate thread. The reason why lag occurs due to numerous animation effects is because countless elements are re-rendered nearly 60 times per second.

> This is package mainly used when using canvas, which is controlled using js, an environment where css is not available.

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
In this package, the curve means an instance of a cubic object.

### What is a cubic?




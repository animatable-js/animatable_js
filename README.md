# Use animation in Javascript
This package allows easy implementation of linear or curved animation.
> Especially suitable in a development environment on web components or canvas.

## How to make linear animation?
refer to this code!
```js
const controller = new AnimationController(initialValue, lowerValue, upperValue, duration)

controller.addListener(value => {
  console.log(value);
}
controller.forward();
```

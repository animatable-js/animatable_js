# 자바스크립트에서 애니메이션 구현
해당 패키지를 사용하면 선형 또는 커브 애니메이션을 자바스크립트에서 쉽게 구현할 수 있습니다.
`특히 Web Components 또는 캔버스 요소를 사용하는 개발 환경에 적합합니다.`

[원문 보기](README.md)

> 해당 패키지에서 계산되는 리소스 비용은 요소가 렌더링되는 것과 비교해서 매우 적습니다.
> 
> 따라서 별도의 쓰레드에서 처리할 필요가 없습니다. 만약 수 많은 애니메이션 효과로 인해 화면 끊김이 발생한다면, 그 이유는 단순히 많은 요소들이 최소 초당 60번 가까이 재렌더링되기 때문입니다.

> css를 사용할 수 없는 환경에서 js 환경에서 제어하는 canvas 요소를 사용할 때 주로 사용되는 패키지입니다.

## npm을 사용하여 설치
터미널에 아래 명령어를 입력하고 실행하세요.
```
npm install animatable-js
```

## JS 모듈을 프리로드하는 방법.
최상위 HTML 파일에서 아래 코드와 같이 작성하세요. `ex: index.html`.

> 개발 환경에 맞게 필요에 따라 경로를 수정해 주시기 바랍니다.

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

## 선형 애니메이션은 어떻게 구현해야 되나요?
아래 코드를 참고해주세요!

### 값의 범위가 존재하는 애니메이션의 경우.
`AnimationController`의 경우 해당 패키지의 모든 애니메이션 동작들을 구현하는데 사용되는 원시적 기반 컨트롤러입니다.

```js
const controller = new AnimationController(
  duration,           // milliseconds
  initialValue?,      // lowerValue(0) ~ upperValue(1)
  lowerValue?,        // 0
  upperValue?,        // 1
  isAbsoluteDuration? // ... 자세한 내용은 클래스 내부 주석을 참고하세요.
);

controller.addListener(value => {
  console.log(value);

  // 상대 값은 항상 0에서 1로 반환됩니다.
  console.log(controller.relValue);

  // 진행 값은 항상 0에서 1로 반환됩니다, 또한 감산되지 않습니다.
  // 이는 절대적으로 값이 0에서 1로 증감한다는 것을 의미합니다.
  console.log(controller.progressValue);
});
controller.addStatusListener(status => {
  console.log(status);
});
controller.forward(delay?); // 또는 controller.backward(delay?)

// 주어진 목표 값으로 이동.
controller.animateTo(0.5);

// 반복 애니메이션.
controller.repeat(startDelay?, cycleDelay?)
```

### 값의 범위가 존재하지 않는 경우.
`Animation`의 경우 변화하는 값을 애니메이션화하려는 경우에 주로 사용됩니다.

```js
const animation = new Animation(duration, initialValue?, curve?);

animation.addListener(value => {
  console.log(value);

  // non-clmaping 애니메이션을 구성하는 기반 컨트롤러입니다.
  const controller = animation.parent;
  
  console.log(controller.relValue); // 또는 controller.value
  console.log(controller.progressValue);
});
animation.animateTo(target);

// ... 생략
```

### Animation Status 상수
자세한 내용은 `animation_controller/AnimationStatus`를 참고하세요.

| Name | Value
| ------ | ------
| None | "none"
| FORWARD | "forward"
| FORWARDED | "forwarded"
| BACKWARD | "backward"
| BACKWARDED | "backwarded"

## 커브 애니메이션은 어떻게 구현해야 되나요?
아래 코드를 참고해주세요!
```js
// 여기서 parent는 AnimationController 객체의 인스턴스를 의미합니다.
const controller = new CurvedAnimation(parent, curve = Curve.Ease);

// 또는 new Cubic(x1, y1, x2, y2).createAnimation(...)
const controller = Curve.Ease.createAnimation(
  duration,
  initialValue?,
  lowerValue?,
  upperValue?,
  isAbsoluteDuration
);

// ... 생략
```

### curve이 무엇인가요?
해당 패키지에서의 curve은 cubic 객체의 인스턴스를 의미합니다.

> `cubic.js`의 Curve에서 기본적으로 제공되는 Cubic 인스턴스들을 사용할 수 있습니다.
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

### cubic이 무엇인가요? (cubic-bezier)
애니메이션 값의 변화량이 일정하지 않고 시간에 따라 값의 변화량이 가속되거나 감소시키는 기능을 제공합니다.

> 자세한 내용은 [위키백과](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)를 참고해주세요.

### cubic 객체는 만드는 방법은 무엇인가요??
아래 코드를 참고해주세요!
```js
const curve = new Cubic(x1, y1, x2, y2, start?, end?);
// ... 생략
```
![curve](https://github.com/MTtankkeo/js_animatable/assets/122026021/1c22b58c-481f-47f2-a8e4-cc7b03672f86)

> [cubic-bezier.com](https://cubic-bezier.com)으로 가서 cubic 만들기.

### Cubic을 반전시키는 방법은 무엇인가요?
```js
const easeFlipped = Curve.Ease.flipped;
```

## ColorTween 애니메이션을 만드는 방법은 무엇인가요?
`Color`와 `ColorTween` 클래스를 활용해주세요!

```js
const red  = new Color(255, 0, 0, alpha?);    // 또는 new Color.parse("#FF0000")
const blue = new Color.var("--blue", scope?); // 또는 new Color.parse("0000FF")

// new ColorTween(start, end);
const colorTween = new ColorTween(red, blue);

animation.addListener(value => {
  const color = colorTween.transform(value);
  // ... 생략
});
```

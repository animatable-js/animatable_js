# 자바스크립트에서 애니메이션 구현
해당 패키지를 사용하면 선형 또는 커브 애니메이션을 자바스크립트에서 쉽게 구현할 수 있습니다.
`특히 Web Components 또는 캔버스 요소를 사용하는 개발 환경에 적합합니다.`

[원문 보기](README.md)

> 해당 패키지에서 계산되는 리소스 비용은 요소가 렌더링되는 것과 비교해서 매우 적습니다.
> 
> 따라서 별도의 쓰레드에서 처리할 필요가 없습니다. 만약 수 많은 애니메이션 효과로 인해 화면 끊김이 발생한다면, 해당 이유는 단순히 많은 요소들이 초당 60번 가까이 재렌더링되기 때문입니다.

> css를 사용할 수 없는 환경에서 js 환경에서 제어하는 canvas 요소를 사용할 때 주로 사용되는 패키지입니다.

## 선형 애니메이션은 어떻게 구현해야 되나요??
아래 코드를 참고해주세요!

### With clamping.
```js
const controller = new AnimationController(
  duration,          // milliseconds
  initialValue,      // lowerValue(0) ~ upperValue(1)
  lowerValue,        // 0
  upperValue,        // 1
  isAbsoluteDuration // ... 자세한 내용은 클래스 내부 주석을 참고하세요.
);

controller.addListener(value => {
  console.log(value);
});
controller.forward();
```

## 커브 애니메이션은 어떻게 구현해야 되나요?
아래 코드를 참고해주세요!
```js
const controller = new CurvedAnimation(duration, curve, parent);
// ... skip
```

### curve이 무엇인가요?
해당 패키지에서의 curve은 cubic 객체의 인스턴스를 의미합니다.

### cubic이 무엇인가요?



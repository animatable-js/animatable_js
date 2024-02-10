import { Animation, AnimationStatus, Color, ColorTween, Cubic, Curve } from "../../js/lib.js";




const box = document.getElementById("box");
const percentText = document.getElementById("percent_text");
const button = document.getElementById("animate");

// Curve.Ease.createAnimation(500, null, 0, 1)
const controller = new Animation(500, null, Curve.Ease);
const colorTween = new ColorTween(Color.var("--red"), Color.var("--blue"));

controller.addListener(value => {
    const parent = box.parentElement.getBoundingClientRect();
    const ract = box.getBoundingClientRect();
    
    box.style.transform = `translate(${(parent.width - ract.width) * value}px, 0px)`;
    box.style.backgroundColor = colorTween.transform(value).toHex();
    percentText.textContent = `${Math.round(value * 100)}%`;
});

let target = 0;

button.onclick = _ => {
    if (controller.status == AnimationStatus.NONE
     || controller.status == AnimationStatus.BACKWARD
     || controller.status == AnimationStatus.BACKWARDED) {
        controller.animateTo(1);
        return;
    }

    controller.animateTo(0);
}
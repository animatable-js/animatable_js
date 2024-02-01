import { AlwaysAnimation } from "../../js/always_animation.js";
import { AnimationController, AnimationStatus } from "../../js/animation_controller.js";
import { Color } from "../../js/color.js";
import { ColorTween } from "../../js/color_tween.js";
import { Curve } from "../../js/cubic.js";
import { CurvedAnimation } from "../../js/curved_animation.js";



const box = document.getElementById("box");
const percentText = document.getElementById("percent_text");
const button = document.getElementById("animate");

const controller = new CurvedAnimation(700, Curve.Ease);

const colorTween = new ColorTween(new Color(255, 0, 0), new Color(0, 100, 255));
colorTween.transform

controller.addListener(value => {
    const parent = box.parentElement.getBoundingClientRect();
    const ract = box.getBoundingClientRect();
    
    box.style.transform = `translate(${(parent.width - ract.width)   * value}px, 0px)`;
    box.style.backgroundColor = colorTween.transform(value).toHex();
    percentText.textContent = `${Math.round(value * 100)}%`;
});

button.onclick = _ => {
    if (controller.status == AnimationStatus.NONE
     || controller.status == AnimationStatus.BACKWARD
     || controller.status == AnimationStatus.BACKWARDED) {
        controller.forward();
        return;
    }

    controller.backward();
}
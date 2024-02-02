import { AnimationStatus } from "../../js/animation_controller.js";
import { Color } from "../../js/color.js";
import { ColorTween } from "../../js/color_tween.js";
import { Curve } from "../../js/cubic.js";
import { CurvedAnimation } from "../../js/curved_animation.js";



const box = document.getElementById("box");
const percentText = document.getElementById("percent_text");
const button = document.getElementById("animate");

const controller = new CurvedAnimation(500, Curve.Ease);

const colorTween = new ColorTween(Color.var("--red"), Color.var("--blue"));

controller.addListener(value => {
    const parent = box.parentElement.getBoundingClientRect();
    const ract = box.getBoundingClientRect();
    
    box.style.transform = `translate(${(parent.width - ract.width)   * value}px, 0px)`;
    box.style.backgroundColor = colorTween.transform(value).toHex();
    percentText.textContent = `${Math.round(value * 100)}%`;
});

controller.addStatusListener(status => {

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
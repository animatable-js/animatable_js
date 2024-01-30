import { AnimationStatus } from "./animation_controller.js";
import { Curve } from "./cubic.js";
import { CurvedAnimation } from "./curved.js";



const box = document.getElementById("box");
const percentText = document.getElementById("percent_text");
const button = document.getElementById("animate");

const controller = new CurvedAnimation(750, Curve.Ease);

controller.addListener(value => {
    box.style.width = `${value * 100}%`;
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
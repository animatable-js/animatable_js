import { Animation, Curve } from "../dist/index.esm.js";

const text = document.getElementById("text");
const box = document.getElementById("box");
const animation = new Animation(1000, Curve.Ease);
animation.addListener(value => {
    box.style.width = `${value * 100}%`;
    text.textContent = value;
});
animation.repeat(1, 0);
import { Animation, Curve } from "../dist/index.esm.js";

const text = document.getElementById("text");
const box = document.getElementById("box");
const animation = new Animation(10000);
const animations = [];
animation.addListener(value => {
    box.style.width = `${value * 100}%`;
    text.textContent = value;
});
animation.animateTo(1);

for (let i = 0; i < 1000; i++) {
    animations.push(new Animation(10000));
}

animations.forEach(e => e.animateTo(1));
import { Animation } from "../dist/index.esm.js";

const text = document.getElementById("text");
const animation = new Animation(1000);
animation.addListener(value => {
    console.log(value);
    text.textContent = value;
});
animation.animateTo(1);
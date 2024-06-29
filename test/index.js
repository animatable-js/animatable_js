import { Animation } from "../dist/index.esm.js";

const animation = new Animation();

const text = document.getElementById("text");
text.textContent = animation.value;
import { AnimationController } from "./animation_controller.js";
import { Cubic, CubicPoint } from "./cubic.js";



/** @type {HTMLCanvasElement} */
const graph = document.getElementById("graph");
const ctx = graph.getContext("2d");
const size = graph.getBoundingClientRect().width;
const button = document.getElementById("animate");
ctx.moveTo(0, size);

const controller = new AnimationController(null, null, null, 1000);
const curve = new Cubic(0, 1, 0, 1);

controller.addListener(value => {
    const result = curve.transform(value);
    const lineWidth = 2;
    
    ctx.strokeStyle = "red";
    ctx.lineWidth = lineWidth;
    ctx.lineTo(size * value, size - (size * result));
    ctx.stroke();
});

button.onclick = _ => {
    controller.forward();
}
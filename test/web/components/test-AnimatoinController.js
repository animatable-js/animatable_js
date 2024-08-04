import { TestElement } from "./test-element";

export class TestAnimationControllerElement extends TestElement {
    start() {
        console.log("Test for AnimationController");
    }
}

customElements.define("test-AnimatoinController", TestAnimationControllerElement);
"use strict";

const canvasW = 500;
const canvasH = 500;

const myText = {
    word: "test",
    fill: {
        r: 255,
        g: 255,
        b: 255
    },
    size: 28,
    x: canvasW / 2,
    y: canvasH / 2
};

const spacing = 25;

function setup() {
    createCanvas(canvasW, canvasH);
}

function draw() {
    background("black");

    push();
    fill(myText.fill.r, myText.fill.g, myText.fill.b);
    textSize(myText.size);
    textAlign(CENTER, CENTER);
    text(myText.word, myText.x, myText.y);
    pop();

    push();
    fill(myText.fill.r, myText.fill.g, myText.fill.b);
    textSize(myText.size);
    textAlign(CENTER, CENTER);

    for (let i = 0; i <= 9; i++) {
        text(i, 50 + i * spacing, 50);
    }

    for (let i = 16; i >= 0; i--) {
        let newI = abs(i - 15);
        text(newI, 50, 50 + newI * spacing);
    }

    pop();

}
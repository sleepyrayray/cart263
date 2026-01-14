"use strict";

const canvasW = 500;
const canvasH = 500;

const rectW = canvasW / 3;
const rectH = canvasH;

const r1X = 0;
const r2X = rectW;
const r3X = rectW * 2;

const rY = 0;

const blue1 = {
    r: 30,
    g: 80,
    b: 200
};
const blue2 = {
    r: 20,
    g: 120,
    b: 230
};
const blue3 = {
    r: 10,
    g: 160,
    b: 255
};
const white = {
    r: 255,
    g: 255,
    b: 255
};

function setup() {
    createCanvas(canvasW, canvasH);
}

function draw() {
    background("black");

    // rect 1
    push();
    if (mouseX >= r1X && mouseX < r1X + rectW && mouseY >= rY && mouseY < rY + rectH) {
        fill(white.r, white.g, white.b);
    }
    else {
        fill(blue1.r, blue1.g, blue1.b);
    }
    rect(r1X, rY, rectW, rectH);
    pop();

    // rect 2
    push();
    if (mouseX >= r2X && mouseX < r2X + rectW && mouseY >= rY && mouseY < rY + rectH) {
        fill(white.r, white.g, white.b);
    }
    else {
        fill(blue2.r, blue2.g, blue2.b);
    }
    rect(r2X, rY, rectW, rectH);
    pop();

    // rect 3
    push();
    if (mouseX >= r3X && mouseX < r3X + rectW && mouseY >= rY && mouseY < rY + rectH) {
        fill(white.r, white.g, white.b);
    }
    else {
        fill(blue3.r, blue3.g, blue3.b);
    }
    rect(r3X, rY, rectW, rectH);
    pop();
}
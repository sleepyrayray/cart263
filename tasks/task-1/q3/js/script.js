"use strict";
let r1X = undefined;
let r1Y = undefined;

let r2X = undefined;
let r2Y = undefined;

let r3X = 0;
let r3Y = 0;
let r3Speed = 2;

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background("black");

    r3Y += r3Speed;

    handleBottomBound();

    drawSquare(r3X, r3Y, 30, 0, 255, 0);
    drawSquare(r2X, r2Y, 80, 0, 0, 255);
    drawSquare(r1X, r1Y, 80, 255, 0, 255);
}

function drawSquare(x, y, w, r, g, b) {
    push();
    fill(r, g, b);
    square(x, y, w);
    pop();
}

function keyPressed(event) {
    if (event.keyCode === 32) {
        r1X = random(0, width);
        r1Y = random(0, height);
    }
}

function mouseClicked() {
    r2X = mouseX;
    r2Y = mouseY;
}

function handleBottomBound() {
    if (r3Y > height) {
        r3Y = 0;
    }
}
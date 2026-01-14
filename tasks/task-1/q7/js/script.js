"use strict";

const canvasW = 500;
const canvasH = 500;

// change this var - must be multiple of 5, max 100)
let circleSize = 50;

let circleR = undefined;
let circleG = undefined;
let circleB = undefined;

let isCircle = true;

function setup() {
    createCanvas(canvasW, canvasH);

    // randomize colors on refresh
    pickRandomColor();
}

function draw() {
    background("black");

    if (isCircle === true) {
        // starts at half a circle so circles are fully inside the canvas
        for (let x = circleSize / 2; x <= width - circleSize / 2; x += circleSize) {
            for (let y = circleSize / 2; y <= height - circleSize / 2; y += circleSize) {
                push();
                fill(circleR, circleG, circleB);
                ellipse(x, y, circleSize);
                pop();
            }
        }
    }
    else {
        for (let x = 0; x <= width - circleSize; x += circleSize) {
            for (let y = 0; y <= height - circleSize; y += circleSize) {
                push();
                fill(circleR, circleG, circleB);
                rect(x, y, circleSize);
                pop();
            }
        }
    }
}

// change color on spacebar
function keyPressed() {
    if (key === " ") {
        pickRandomColor();
    }
}

function pickRandomColor() {
    circleR = random(255);
    circleG = random(255);
    circleB = random(255);
}

// change shapes on mouse click
function mousePressed() {
    if (isCircle === true) {
        isCircle = false;
    }
    else {
        isCircle = true;
    }
}
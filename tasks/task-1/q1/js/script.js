"use strict";

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background("black");

    push();
    fill("white");
    ellipse(50, 50, 80, 80);
    pop();

    push();
    fill("green");
    ellipse(100, 150, 130, 130);
    pop();

    push();
    fill("red");
    ellipse(300, 320, 240, 240);
    pop();
}
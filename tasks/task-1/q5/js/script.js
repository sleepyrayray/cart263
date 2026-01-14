"use strict";

const canvasW = 500;
const canvasH = 500;

let counter = 0;

const orangeSquare = {
    x: 50,
    y: 50,
    w: 70,
    h: 70,
    color: {
        r: 255,
        g: 150,
        b: 0
    }
}

let radius = 30;
let ellipseAlpha = 20;

function setup() {
    createCanvas(canvasW, canvasH);
}

function draw() {
    background("black");

    displaySquare();

    drawCircle(width / 2, height / 2, radius, ellipseAlpha);
}

function drawCircle(x, y, r, alpha) {
    if (counter >= 1 && counter <= 10) {
        let i = 0;
        let currentRadius = r;
        let currentAlpha = alpha;

        while (i < counter) {
            push();
            fill(255, 255, 255, currentAlpha);
            ellipse(x, y, currentRadius * 2, currentRadius * 2);
            pop();

            currentRadius += 20;
            currentAlpha += 5;
            i++;
        }
    }
}

function displaySquare() {
    push();

    // if mouse hover
    if (checkCollisionWithSquare() === true) {
        fill(orangeSquare.color.r, orangeSquare.color.g + 50, orangeSquare.color.b + 50);
    }
    // if NOT mouse hover
    else {
        fill(orangeSquare.color.r, orangeSquare.color.g, orangeSquare.color.b);
    }

    rect(orangeSquare.x, orangeSquare.y, orangeSquare.w, orangeSquare.h);
    pop();
}

function checkCollisionWithSquare() {
    if (mouseX >= orangeSquare.x && mouseX <= orangeSquare.x + orangeSquare.w && mouseY >= orangeSquare.y && mouseY <= orangeSquare.y + orangeSquare.h) {
        return true;
    }
    else {
        return false;
    }
}

function mousePressed() {
    if (checkCollisionWithSquare() === true) {
        counter++;
    }
}
/*
 * main entry file for RoboShop
 * p5 starts the project here
 */

"use strict";

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;
const START_SCREEN = "menu";

let app = undefined;
let projectCanvas = undefined;

// p5 starts the project here
function setup() {
  projectCanvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  app = new RobotShopApp();
  app.setup();
}

// p5 keeps calling draw every frame
function draw() {
  if (app !== undefined) {
    app.draw();
  }
}

// mouse clicks pass through the app here
function mousePressed() {
  if (app !== undefined) {
    app.mousePressed();
  }
}

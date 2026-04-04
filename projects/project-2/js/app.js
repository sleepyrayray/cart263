"use strict";

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

let app = undefined;

// p5 starts the project here.
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  app = new PetShopApp();
  app.setup();
}

// p5 keeps calling draw every frame.
function draw() {
  if (app !== undefined) {
    app.draw();
  }
}

// This sends mouse clicks into the app.
function mousePressed() {
  if (app !== undefined) {
    app.mousePressed();
  }
}

class PetShopApp {
  constructor() {
    // Shared project data can live here later.
    this.currentScreen = undefined;
  }

  setup() {
    // These are basic text settings for now.
    textAlign(CENTER, CENTER);
    textFont("Arial");

    this.currentScreen = new PlaceholderScreen(this);
    this.currentScreen.enter();
  }

  draw() {
    if (this.currentScreen !== undefined) {
      this.currentScreen.update();
      this.currentScreen.display();
    }
  }

  mousePressed() {
    if (this.currentScreen !== undefined) {
      this.currentScreen.mousePressed();
    }
  }

  // Use this later to switch screens cleanly.
  setScreen(newScreen) {
    this.currentScreen = newScreen;
    this.currentScreen.enter();
  }
}

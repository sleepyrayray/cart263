/*
 * main app file for robot shop
 * ray can connect the shared app flow here
 */

"use strict";

const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;
const START_SCREEN = "menu";

let app = undefined;

// p5 starts the project here
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  app = new RobotShopApp();
  app.setup();
}

// p5 keeps calling draw every frame
function draw() {
  if (app !== undefined) {
    app.draw();
  }
}

// this sends mouse clicks into the app
function mousePressed() {
  if (app !== undefined) {
    app.mousePressed();
  }
}

class RobotShopApp {
  constructor() {
    // shared project data can live here later
    this.screens = {};
    this.currentScreenKey = undefined;
    this.currentScreen = undefined;
    this.projectData = {
      consentGiven: false,
      selectedRobotType: null,
      answers: [],
      recordedAudio: null,
      recordingDurationSeconds: 5
    };
  }

  setup() {
    // these are basic text settings for now
    textAlign(CENTER, CENTER);
    textFont("Arial");

    // create the main project screens here
    this.createScreens();

    // start on the menu screen first
    this.setScreen(START_SCREEN);
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

  // this sets up each main screen for the project
  createScreens() {
    this.screens.menu = new MenuScreen(this);
    this.screens.questions = new QuestionScreen(this);
    this.screens.voice = new VoiceScreen(this);
    this.screens.reveal = new RevealScreen(this);
  }

  // use this later to switch screens cleanly
  setScreen(screenKey) {
    if (this.screens[screenKey] === undefined) {
      return;
    }

    this.currentScreenKey = screenKey;
    this.currentScreen = this.screens[screenKey];
    this.currentScreen.enter();
  }
}

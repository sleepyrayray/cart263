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

// mouse clicks pass through the app here
function mousePressed() {
  if (app !== undefined) {
    app.mousePressed();
  }
}

class RobotShopApp {
  constructor() {
    // shared project data lives here
    this.screens = {};
    this.currentScreenKey = undefined;
    this.currentScreen = undefined;
    this.isLoading = true;
    this.loadError = null;
    this.questionsData = null;
    this.robotsData = null;
    this.projectData = {
      consentGiven: false,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      robotScores: this.createEmptyRobotScores(),
      selectedRobotType: null,
      selectedColor: null,
      rawAudio: null,
      filteredAudio: null,
      audioStatus: {
        hasRecording: false,
        isConfirmed: false,
        isProcessing: false
      },
      recordingDurationSeconds: 5
    };
  }

  async setup() {
    // basic text settings start here
    textAlign(CENTER, CENTER);
    textFont("Arial");

    // project data loads before the screens start
    await this.loadData();

    if (this.loadError !== null) {
      return;
    }

    // main project screens are created here
    this.createScreens();

    // the menu screen starts first
    this.setScreen(START_SCREEN);
    this.isLoading = false;
  }

  draw() {
    if (this.isLoading === true) {
      this.displayLoadingScreen();
      return;
    }

    if (this.loadError !== null) {
      this.displayErrorScreen();
      return;
    }

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

  // empty score totals start here for each robot type
  createEmptyRobotScores() {
    return {
      companion: 0,
      domestic: 0,
      security: 0,
      social: 0,
      utility: 0
    };
  }

  // json files load here before the project begins
  async loadData() {
    try {
      this.questionsData = await this.loadJsonFile("assets/data/questions-data.json");
      this.robotsData = await this.loadJsonFile("assets/data/robots-data.json");
      this.loadError = null;
    }
    catch (error) {
      this.loadError = "project data could not load";
      this.isLoading = false;
      console.error(error);
      return;
    }
  }

  // one json file loads at a time through this helper
  async loadJsonFile(filePath) {
    const response = await fetch(filePath);

    if (response.ok === false) {
      throw new Error(`could not load ${filePath}`);
    }

    return await response.json();
  }

  // each main screen is set up here
  createScreens() {
    this.screens.menu = new MenuScreen(this);
    this.screens.questions = new QuestionScreen(this);
    this.screens.voice = new VoiceScreen(this);
    this.screens.reveal = new RevealScreen(this);
  }

  // screen changes run through this function
  setScreen(screenKey) {
    if (this.screens[screenKey] === undefined) {
      return;
    }

    this.currentScreenKey = screenKey;
    this.currentScreen = this.screens[screenKey];
    this.currentScreen.enter();
  }

  // a simple loading screen shows while the json files are loading
  displayLoadingScreen() {
    background(247, 241, 232);
    fill(20);
    noStroke();
    textSize(24);
    text("loading robot shop...", width / 2, height / 2);
  }

  // a simple error screen shows if the json files fail to load
  displayErrorScreen() {
    background(247, 241, 232);
    fill(20);
    noStroke();
    textSize(24);
    text(this.loadError, width / 2, height / 2);
  }
}

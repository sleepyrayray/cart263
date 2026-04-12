/*
 * menu screen file
 * jason can build the menu here
 */

"use strict";

class MenuScreen extends Screen {
  constructor(app) {
    super(app);
    this.titleX = 50;
    this.titleY = 50;
    this.instructButton = {
      buttonId: "instructions",
      label: "instructions",
      x: 50,
      y: 200,
      width: 120,
      height: 30,
    };
    this.playButton = {
      buttonId: "play",
      label: "play",
      x: 450,
      y: 200,
      width: 120,
      height: 30,
    };
    this.checkbox = {
      x: 50,
      y: 170,
      size: 25,
    };
    this.instructionVisible = false;
    this.instructionsX = 50;
    this.instructionsY = 50;
    this.instructionsWidth = CANVAS_WIDTH - 100;
    this.instructionHeight = CANVAS_HEIGHT - 100;
    this.instrcutionCloseSize = 25;
    this.instructionCloseButton = {
      buttonId: "instructionClose",
      label: "",
      x: this.instructionsX + this.instructionsWidth - this.instrcutionCloseSize - 10,
      y: this.instructionsY + 10,
      width: 25,
      height: 25,
    };
    this.instructionContentLineHeight = 30;
    this.instructionTitleX = this.instructionsX + 20;
    this.instructionTitleY = this.instructionsY + 30;
    this.instructionContentX = this.instructionTitleX;
    this.instructionContentY = this.instructionTitleY + this.instructionContentLineHeight;
  }

  // menu drawing will live here later
  display() {
    this.displayBackground();
    this.displayFrame();
    this.displayTitle();
    this.displayButtons();
    this.displayConsent();
    this.displayInstructions();
  }

  displayTitle() {
    fill(20);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    text(`RoboShop`, this.titleX, this.titleY);
  }

  displayButtons() {
    // instructionButton
    push();
    let isHovered = this.isMouseInsideButton(this.instructButton);

    if (isHovered === true) {
      fill(230);
    }
    else {
      fill(245);
    }

    rectMode(CORNER);
    stroke(20);
    strokeWeight(2);
    rect(this.instructButton.x, this.instructButton.y, this.instructButton.width, this.instructButton.height);

    fill(20);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    text(this.instructButton.label, this.instructButton.x + 15, this.instructButton.y + this.instructButton.height / 2);

    // play button
    isHovered = this.isMouseInsideButton(this.playButton);

    if (isHovered === true) {
      fill(230);
    }
    else {
      fill(245);
    }

    rectMode(CORNER);
    stroke(20);
    strokeWeight(2);
    rect(this.playButton.x, this.playButton.y, this.playButton.width, this.playButton.height);

    fill(20);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    text(this.playButton.label, this.playButton.x + 15, this.playButton.y + this.playButton.height / 2);
    pop();
  }

  displayConsent() {
    // the consent check is only visual for now
    const consentGiven = true;

    push();
    rectMode(CORNER);
    stroke(20);
    strokeWeight(2);
    noFill();
    rect(this.checkbox.x, this.checkbox.y, this.checkbox.size, this.checkbox.size, 5);

    if (consentGiven === true) {
      line(this.checkbox.x, this.checkbox.y + this.checkbox.size / 4, this.checkbox.x + this.checkbox.size / 2, this.checkbox.y + this.checkbox.size / 3 * 2);
      line(this.checkbox.x + this.checkbox.size / 2, this.checkbox.y + this.checkbox.size / 3 * 2, this.checkbox.x + this.checkbox.size, this.checkbox.y);
    }

    noStroke();
    fill(20);
    textAlign(LEFT, CENTER);
    textSize(18);
    text("I agree that my voice will be recorded and used in this website.", this.checkbox.x + this.checkbox.size + 20, this.checkbox.y + this.checkbox.size / 2);
    pop();
  }

  mousePressed() {
    const clickedButton = this.findClickedButton();

    if (clickedButton === null) {
      return;
    }

    this.handleSelectedOption(clickedButton);
  }

  findClickedButton() {
    if (this.isMouseInsideButton(this.instructButton) === true) {
      return this.instructButton;
    }

    if (this.isMouseInsideButton(this.playButton) === true) {
      return this.playButton;
    }

    if (this.isMouseInsideButton(this.instructionCloseButton) === true) {
      return this.instructionCloseButton;
    }

    return null;
  }

  handleSelectedOption(optionData) {
    if (optionData.buttonId === "instructions") {
      this.instructionVisible = true;
    }

    if (optionData.buttonId === "instructionClose") {
      this.instructionVisible = false;
    }
  }

  displayInstructions() {
    if (this.instructionVisible === false) {
      return;
    }

    push();
    noStroke();
    fill(157, 241, 232);
    rect(this.instructionsX, this.instructionsY, this.instructionsWidth, this.instructionHeight, 20);

    stroke(20);
    strokeWeight(2);
    noFill();
    rect(this.instructionCloseButton.x, this.instructionCloseButton.y, this.instructionCloseButton.width, this.instructionCloseButton.height, 5);
    line(this.instructionCloseButton.x, this.instructionCloseButton.y, this.instructionCloseButton.x + this.instructionCloseButton.width, this.instructionCloseButton.y + this.instructionCloseButton.height);
    line(this.instructionCloseButton.x, this.instructionCloseButton.y + this.instructionCloseButton.height, this.instructionCloseButton.x + this.instructionCloseButton.width, this.instructionCloseButton.y);

    fill(20);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    text(`How to play`, this.instructionTitleX, this.instructionTitleY);
    text(`1. The user answers a short set of multiple choice questions about their ideal robot.`, this.instructionContentX, this.instructionContentY);
    text(`2. The user records about 5 seconds of their voice.`, this.instructionContentX, this.instructionContentY + this.instructionContentLineHeight);
    text(`3. The project ends with a reward moment.`, this.instructionContentX, this.instructionContentY + 2 * this.instructionContentLineHeight);
    pop();
  }

  // button hit testing runs here
  isMouseInsideButton(buttonData) {
    const isInsideX = mouseX >= buttonData.x && mouseX <= buttonData.x + buttonData.width;
    const isInsideY = mouseY >= buttonData.y && mouseY <= buttonData.y + buttonData.height;

    return isInsideX && isInsideY;
  }
}

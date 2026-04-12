/*
 * menu screen file
 * jason can build the menu here
 */

"use strict";

class MenuScreen extends Screen {
  constructor(app) {
    super(app);
    this.titleText = "RoboShop";
    this.subtitleText = "Your ideal robot starts here";
    this.titleFontName = "Trebuchet MS";
    this.titleX = CANVAS_WIDTH / 2;
    this.titleY = 170;
    this.subtitleX = CANVAS_WIDTH / 2;
    this.subtitleY = 235;
    this.guideButton = {
      buttonId: "guide",
      label: "guide",
      x: CANVAS_WIDTH / 2 - 90,
      y: 310,
      width: 180,
      height: 46
    };
    this.guideVisible = false;
    this.guidePanel = {
      x: 110,
      y: 55,
      width: CANVAS_WIDTH - 220,
      height: CANVAS_HEIGHT - 110
    };
    this.closeButton = {
      buttonId: "closeGuide",
      label: "",
      x: this.guidePanel.x + this.guidePanel.width - 44,
      y: this.guidePanel.y + 16,
      width: 28,
      height: 28
    };
    this.checkbox = {
      buttonId: "consent",
      x: this.guidePanel.x + 34,
      y: this.guidePanel.y + 260,
      size: 24
    };
    this.startButton = {
      buttonId: "start",
      label: "start",
      x: this.guidePanel.x + this.guidePanel.width - 156,
      y: this.guidePanel.y + this.guidePanel.height - 66,
      width: 120,
      height: 40
    };
    this.bulletItems = [
      "you will answer a few quick questions so we can match you with a robot",
      "you will choose a robot color before the final reveal",
      "you will record up to 5 seconds of your voice for your robot",
      "you will open the package and meet the robot that fits you best"
    ];

    // the menu starts with consent unchecked
    this.app.projectData.consentGiven = false;
  }

  // the full menu view is drawn here
  display() {
    this.displayBackground();
    this.displayFrame();
    this.displayTitle();
    this.displayGuideButton();
    this.displayGuidePopup();
  }

  // the main title and subtitle sit in the middle here
  displayTitle() {
    push();
    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textFont(this.titleFontName);
    textStyle(BOLD);
    textSize(72);
    text(this.titleText, this.titleX, this.titleY);
    textStyle(NORMAL);
    textSize(24);
    text(this.subtitleText, this.subtitleX, this.subtitleY);
    pop();
  }

  // the main menu only shows the guide button
  displayGuideButton() {
    if (this.guideVisible === true) {
      return;
    }

    this.displayButton(this.guideButton, true);
  }

  // the guide popup opens here when the user clicks the guide button
  displayGuidePopup() {
    if (this.guideVisible === false) {
      return;
    }

    push();
    noStroke();
    fill(250, 248, 242);
    rect(this.guidePanel.x, this.guidePanel.y, this.guidePanel.width, this.guidePanel.height, 24);
    pop();

    this.displayCloseButton();
    this.displayGuideText();
    this.displayConsentArea();

    if (this.app.projectData.consentGiven === true) {
      this.displayButton(this.startButton, true);
    }
  }

  // the guide popup title and customer-facing text are drawn here
  displayGuideText() {
    const titleX = this.guidePanel.x + 34;
    const titleY = this.guidePanel.y + 42;
    const bulletStartY = this.guidePanel.y + 106;
    const bulletDotX = this.guidePanel.x + 40;
    const bulletTextX = bulletDotX + 24;
    const bulletSpacing = 48;

    push();
    fill(20);
    noStroke();
    textAlign(LEFT, CENTER);
    textFont(this.titleFontName);
    textStyle(BOLD);
    textSize(30);
    text("Guide", titleX, titleY);
    textStyle(NORMAL);
    textSize(18);

    for (let index = 0; index < this.bulletItems.length; index += 1) {
      const lineY = bulletStartY + index * bulletSpacing;

      circle(bulletDotX, lineY, 8);
      text(this.bulletItems[index], bulletTextX, lineY, this.guidePanel.width - 110, 48);
    }

    pop();
  }

  // the consent note and checkbox live inside the guide popup here
  displayConsentArea() {
    const consentGiven = this.app.projectData.consentGiven;
    const consentTextX = this.checkbox.x + this.checkbox.size + 18;
    const consentTextY = this.checkbox.y + this.checkbox.size / 2;

    push();
    rectMode(CORNER);
    stroke(20);
    strokeWeight(2);
    noFill();
    rect(this.checkbox.x, this.checkbox.y, this.checkbox.size, this.checkbox.size, 5);

    if (consentGiven === true) {
      line(this.checkbox.x + 4, this.checkbox.y + this.checkbox.size / 2, this.checkbox.x + this.checkbox.size / 2 - 1, this.checkbox.y + this.checkbox.size - 5);
      line(this.checkbox.x + this.checkbox.size / 2 - 1, this.checkbox.y + this.checkbox.size - 5, this.checkbox.x + this.checkbox.size - 4, this.checkbox.y + 5);
    }

    noStroke();
    fill(20);
    textAlign(LEFT, CENTER);
    textSize(17);
    text("I agree to let RoboShop record and sample my voice for my robot", consentTextX, consentTextY, this.guidePanel.width - 120, 40);

    if (consentGiven === false) {
      fill(90);
      textSize(15);
      text("Please agree to start", this.checkbox.x, this.checkbox.y + 46);
    }

    pop();
  }

  // the small x button closes the guide popup here
  displayCloseButton() {
    push();
    rectMode(CORNER);
    stroke(20);
    strokeWeight(2);
    noFill();
    rect(this.closeButton.x, this.closeButton.y, this.closeButton.width, this.closeButton.height, 6);
    line(this.closeButton.x + 6, this.closeButton.y + 6, this.closeButton.x + this.closeButton.width - 6, this.closeButton.y + this.closeButton.height - 6);
    line(this.closeButton.x + 6, this.closeButton.y + this.closeButton.height - 6, this.closeButton.x + this.closeButton.width - 6, this.closeButton.y + 6);
    pop();
  }

  // the shared button drawing style lives here
  displayButton(buttonData, isEnabled) {
    const isHovered = this.isMouseInsideButton(buttonData);

    push();
    rectMode(CORNER);
    stroke(20);
    strokeWeight(2);

    if (isEnabled === false) {
      fill(225);
    }
    else if (isHovered === true) {
      fill(232);
    }
    else {
      fill(245);
    }

    rect(buttonData.x, buttonData.y, buttonData.width, buttonData.height, 8);

    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(buttonData.label, buttonData.x + buttonData.width / 2, buttonData.y + buttonData.height / 2 + 1);
    pop();
  }

  mousePressed() {
    const clickedItem = this.findClickedItem();

    if (clickedItem === null) {
      return;
    }

    this.handleSelectedItem(clickedItem);
  }

  // the active menu hit areas are checked here
  findClickedItem() {
    if (this.guideVisible === false) {
      if (this.isMouseInsideButton(this.guideButton) === true) {
        return this.guideButton;
      }

      return null;
    }

    if (this.isMouseInsideButton(this.closeButton) === true) {
      return this.closeButton;
    }

    if (this.isMouseInsideCheckbox() === true) {
      return this.checkbox;
    }

    if (this.app.projectData.consentGiven === true && this.isMouseInsideButton(this.startButton) === true) {
      return this.startButton;
    }

    return null;
  }

  // the guide popup, consent, and start actions are handled here
  handleSelectedItem(itemData) {
    if (itemData.buttonId === "guide") {
      this.app.projectData.consentGiven = false;
      this.guideVisible = true;
      return;
    }

    if (itemData.buttonId === "closeGuide") {
      this.guideVisible = false;
      return;
    }

    if (itemData.buttonId === "consent") {
      this.app.projectData.consentGiven = !this.app.projectData.consentGiven;
      return;
    }

    if (itemData.buttonId === "start") {
      this.guideVisible = false;
      this.app.resetQuestionFlow();
      this.app.resetAudioData();
      this.app.setScreen("questions");
    }
  }

  // the checkbox has its own hit area here
  isMouseInsideCheckbox() {
    const isInsideX = mouseX >= this.checkbox.x && mouseX <= this.checkbox.x + this.checkbox.size;
    const isInsideY = mouseY >= this.checkbox.y && mouseY <= this.checkbox.y + this.checkbox.size;

    return isInsideX && isInsideY;
  }

  // the shared button hit testing runs here
  isMouseInsideButton(buttonData) {
    const isInsideX = mouseX >= buttonData.x && mouseX <= buttonData.x + buttonData.width;
    const isInsideY = mouseY >= buttonData.y && mouseY <= buttonData.y + buttonData.height;

    return isInsideX && isInsideY;
  }
}

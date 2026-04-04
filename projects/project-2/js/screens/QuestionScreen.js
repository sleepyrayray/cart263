/*
 * question screen file
 * this will hold the quiz section
 */

"use strict";

class QuestionScreen extends Screen {
  constructor(app) {
    super(app);
  }

  // this will hold the quiz screen later
  display() {
    this.displayBackground();
    this.displayFrame();
  }
}

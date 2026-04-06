/*
 * question screen file
 * ray can build the question flow here
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

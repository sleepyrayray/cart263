/*
 * base screen class for the project
 * gives each screen shared functions
 */

"use strict";

class Screen {
  constructor(app) {
    this.app = app;
  }

  // use this later for setup when a screen starts
  enter() {
  }

  // put screen logic here later
  update() {
  }

  // each screen draws its own content here
  display() {
  }

  // each screen can handle clicks here later
  mousePressed() {
  }

  // this keeps the background style the same for each screen
  displayBackground() {
    background(247, 241, 232);
  }

  // this can hold shared guide visuals later
  displayFrame() {
  }
}

/*
 * reveal screen file
 * yann can build the reveal here
 */

"use strict";

class RevealScreen extends Screen {
  constructor(app) {
    super(app);
  }

  // reveal drawing will live here later
  display() {
    this.displayBackground();
    this.displayFrame();
  }
}

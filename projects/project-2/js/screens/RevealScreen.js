/*
 * reveal screen file
 * this will hold the final reveal later
 */

"use strict";

class RevealScreen extends Screen {
  constructor(app) {
    super(app);
  }

  // this will hold the final reveal later
  display() {
    this.displayBackground();
    this.displayFrame();
  }
}

/*
 * customization screen file
 * this will hold pet options later
 */

"use strict";

class CustomizationScreen extends Screen {
  constructor(app) {
    super(app);
  }

  // this will hold the pet customization later
  display() {
    this.displayBackground();
    this.displayFrame();
  }
}

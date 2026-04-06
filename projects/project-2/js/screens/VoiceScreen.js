/*
 * voice screen file
 * ray can build the voice section here
 */

"use strict";

class VoiceScreen extends Screen {
  constructor(app) {
    super(app);
  }

  // this will hold the voice screen later
  display() {
    this.displayBackground();
    this.displayFrame();
  }
}

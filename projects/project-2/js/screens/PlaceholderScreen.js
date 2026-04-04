"use strict";

class PlaceholderScreen extends Screen {
  constructor(app) {
    super(app);
  }

  // For now this is just a simple starter screen.
  display() {
    background(247, 241, 232);

    fill(64, 51, 43);
    noStroke();

    textSize(42);
    text("Pet Shop", width / 2, height / 2 - 20);

    textSize(18);
    text("starter framework", width / 2, height / 2 + 24);
  }
}

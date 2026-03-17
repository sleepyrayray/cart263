class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;

    // Extra values for the sun and the planets on Board A
    this.isSun = false;
    this.isPlanet = false;
    this.baseRadius = radius;
    this.pulseAmount = 0;
    this.pulseSpeed = 0;
    this.pulseAngle = 0;
    this.centerX = x;
    this.centerY = y;
    this.orbitRadius = 0;
    this.angle = 0;
    this.orbitSpeed = 0;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill(); // set the fill
    this.context.lineWidth = 2; //change stroke
    this.context.closePath();
    this.context.stroke();
  }

  update() {
    //update circle
    //this.x += 1;
    //console.log("circle update");
    if (this.isSun === true) {
      // make the sun slowly grow and shrink
      this.pulseAngle += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulseAngle) * this.pulseAmount;
    }

    if (this.isPlanet === true) {
      // move the planet around the sun
      this.angle += this.orbitSpeed;
      this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
      this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;
    }
  }

  containsPoint(pointX, pointY) {
    // check if a mouse click happened inside this circle
    let distanceX = pointX - this.x;
    let distanceY = pointY - this.y;
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= this.radius) {
      return true;
    }

    return false;
  }
}

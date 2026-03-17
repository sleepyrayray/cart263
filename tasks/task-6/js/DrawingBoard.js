class DrawingBoard {
  /* Constructor */
  constructor(canvas, context,drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    // listen for right click so we can remove planets on Board A
    this.canvas.addEventListener("contextmenu", function (e) {
      self.rightClickCanvas(e);
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs /// 
    if(this.drawingBoardId ==="partA"){
      console.log("in A")
    }
    if(this.drawingBoardId ==="partB"){
      console.log("in B")
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId ==="partD"){
      console.log("in D")
   }
  }

  clickCanvas(e) {
   // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);
     
    //differentiate which canvas
   //you can remove the console.logs /// 
     if(this.drawingBoardId ==="partA"){
      console.log("in A")
      this.addPlanetToBoardA(this.mouseOffsetX, this.mouseOffsetY);
    }
    if(this.drawingBoardId ==="partB"){
      console.log("in B")
    }
    if(this.drawingBoardId ==="partC"){
      console.log("in C")
    }
    if(this.drawingBoardId ==="partD"){
      console.log("in D")
      }
  }

  rightClickCanvas(e) {
    // stop the browser menu from popping up on right click
    e.preventDefault();
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    if (this.drawingBoardId === "partA") {
      this.removePlanetFromBoardA(this.mouseOffsetX, this.mouseOffsetY);
    }
  }

  getSunObj() {
    // find the one circle that is acting as the sun
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      if (this.objectsOnCanvas[i].isSun === true) {
        return this.objectsOnCanvas[i];
      }
    }

    return null;
  }

  addPlanetToBoardA(mouseX, mouseY) {
    // use the click position to make a new planet
    let sun = this.getSunObj();

    if (sun === null) {
      return;
    }

    // clicking the sun should do nothing
    if (sun.containsPoint(mouseX, mouseY) === true) {
      return;
    }

    let distanceX = mouseX - sun.x;
    let distanceY = mouseY - sun.y;
    let orbitRadius = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // do not create planets too close to the sun
    if (orbitRadius <= sun.radius + 5) {
      return;
    }

    // pick a random color and size for the new planet
    let planetColors = [
      "#5DADE2",
      "#58D68D",
      "#F5B041",
      "#AF7AC5",
      "#EC7063",
      "#85C1E9",
      "#F1948A"
    ];

    let randomColorIndex = Math.floor(Math.random() * planetColors.length);
    let randomRadius = Math.floor(Math.random() * 12) + 6;

    if (randomRadius >= sun.baseRadius) {
      randomRadius = sun.baseRadius - 4;
    }

    let planet = new CircularObj(
      mouseX,
      mouseY,
      randomRadius,
      planetColors[randomColorIndex],
      "#FFFFFF",
      this.context
    );

    // save the orbit values so the planet can keep circling
    planet.isPlanet = true;
    planet.centerX = sun.x;
    planet.centerY = sun.y;
    planet.orbitRadius = orbitRadius;
    planet.angle = Math.atan2(distanceY, distanceX);
    planet.orbitSpeed = (Math.random() * 0.01) + 0.003;

    // if (Math.random() < 0.5) {
    //   planet.orbitSpeed = planet.orbitSpeed * -1;
    // }

    this.addObj(planet);
  }

  removePlanetFromBoardA(mouseX, mouseY) {
    // remove the planet that was right-clicked
    for (let i = this.objectsOnCanvas.length - 1; i >= 0; i--) {
      let currentObj = this.objectsOnCanvas[i];

      if (currentObj.isPlanet === true && currentObj.containsPoint(mouseX, mouseY) === true) {
        this.objectsOnCanvas.splice(i, 1);
        break;
      }
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    // clear once, then redraw every object
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
     // this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
     this.objectsOnCanvas[i].update();
     this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement){
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }
}

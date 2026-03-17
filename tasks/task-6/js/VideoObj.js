class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY =10;
    this.shapeCol = "#000000";
 

    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");
    this.userProvidedBlur  = 0;
    let self = this;

    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = parseInt(blurInput.value);
      if (isNaN(self.userProvidedBlur)) {
        self.userProvidedBlur = 0;
      }
      console.log(self.userProvidedBlur);
    });

    // save the sepia amount from the input
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");
    this.userProvidedSepia = 0;

    filterButton_sepia.addEventListener("click", function () {
      self.userProvidedSepia = parseInt(sepiaInput.value);
      if (isNaN(self.userProvidedSepia)) {
        self.userProvidedSepia = 0;
      }
      console.log(self.userProvidedSepia);
    });

    // save the hue rotation amount from the input
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");
    this.userProvidedHue = 0;

    filterButton_hue.addEventListener("click", function () {
      self.userProvidedHue = parseInt(hueInput.value);
      if (isNaN(self.userProvidedHue)) {
        self.userProvidedHue = 0;
      }
      console.log(self.userProvidedHue);
    });

    // save the invert amount from the input
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");
    this.userProvidedInvert = 0;

    filterButton_invert.addEventListener("click", function () {
      self.userProvidedInvert = parseInt(invertInput.value);
      if (isNaN(self.userProvidedInvert)) {
        self.userProvidedInvert = 0;
      }
      console.log(self.userProvidedInvert);
    });
  }

  display() {
    this.context.save();
    // apply all the filter values before drawing the video
    this.context.filter =
      `blur(${this.userProvidedBlur}px) ` +
      `sepia(${this.userProvidedSepia}%) ` +
      `hue-rotate(${this.userProvidedHue}deg) ` +
      `invert(${this.userProvidedInvert}%)`;
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50,50)
    this.context.restore();
  }

    //called when rectangle color is to be updated
  changeColor(newCol){
   /** FILL IN */
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx,my){
     /** FILL IN */
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}

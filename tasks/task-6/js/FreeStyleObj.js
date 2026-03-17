class FreeStyleObj {
    constructor(x, y, length, f_color, s_color,context) {
      // We write instructions to set up a Flower here
      // Position and size information
      this.x = x;
      this.y = y;
      this.fill_color = f_color;
      this.stroke_color = s_color;
      this.theta = 0;
      this.length = length;
      this.yOffset = 20;
      this.angularSpeed = .07;
      this.context =context;

      // Extra values for Board C
      this.baseColorRed = 173;
      this.baseColorGreen = 216;
      this.baseColorBlue = 230;
      this.baseWaveHeight = 1;
      this.waveHeight = 1;
      this.baseYOffset = 4;
      this.micLevel = 0;
      this.displayMicLevel = 0;
      this.waveOffset = 0;

    }
  
    display() {
      // reset the wave angle for each new frame
      this.theta = this.waveOffset;
      this.context.fillStyle = this.fill_color; // change the color we are using
      this.context.strokeStyle = this.stroke_color; // change the color we are using
      this.context.beginPath();
      this.context.moveTo(this.x,this.y)
      for(let i =this.x; i< this.x+this.length; i++){
      this.context.lineTo(i,(Math.sin(this.theta)*this.waveHeight)+this.y)
      this.context.lineTo(i,(Math.sin(this.theta)*this.waveHeight)+this.y+this.yOffset)
      this.theta+=this.angularSpeed;
      }
      this.context.stroke(); //set the stroke
    }

    update(){
       // smooth the mic value so the wave changes nicely
       this.displayMicLevel = this.displayMicLevel + (this.micLevel - this.displayMicLevel) * 0.08;

       // make the line flatter when quiet and wavier when loud
       this.waveHeight = this.baseWaveHeight + (this.displayMicLevel * 0.12);
       this.yOffset = this.baseYOffset + (this.displayMicLevel * 0.08);

       // move the wave pattern over time
       this.waveOffset += 0.04 + (this.displayMicLevel * 0.0015);

       // shift from light blue to green
       let greenValue = this.baseColorGreen + parseInt(this.displayMicLevel * 0.25);
       if (greenValue > 255) {
        greenValue = 255;
       }

       let blueValue = this.baseColorBlue - parseInt(this.displayMicLevel * 0.9);
       if (blueValue < 0) {
        blueValue = 0;
       }

       this.fill_color = "rgb(0," + greenValue + "," + blueValue + ")";
       this.stroke_color = this.fill_color;
    }
  }
  

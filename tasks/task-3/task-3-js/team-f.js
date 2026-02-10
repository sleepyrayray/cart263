setup_F();
/** THEME: JOY  */
function setup_F() {
  console.log("in f");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_F`, "ani_canvF", aniA, aniB, aniC, aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniA(parentCanvas) {
    console.log("in ani-A -teamF");
    const imgUrls = [];
    for (let i = 0; i < 10; i++) {
      imgUrls.push(`assets/${i}.jpg`)
    }
    let newElement = document.createElement('img');
    newElement.src = imgUrls[1];
    newElement.classList.add('TEAM_F_joyImg');
    parentCanvas.appendChild(newElement);
    parentCanvas.addEventListener('click', changeImgHandler);

    function changeImgHandler() {
      newElement.src = imgUrls[Math.floor(Math.random() * 10)];
    }
  }


  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
    console.log("in ani-B -teamF");

    // keep it inside the canvas
    parentCanvas.style.position = "relative";
    parentCanvas.style.overflow = "hidden";

    parentCanvas.addEventListener("mousemove", paintRainbow);

    function paintRainbow(e) {
      let canvas = this.getBoundingClientRect();
      let x = e.clientX - canvas.left;
      let y = e.clientY - canvas.top;

      // create dot
      let dot = document.createElement("div");
      dot.classList.add("TEAM_F_paintDot");
      dot.textContent = "🙂";

      // dot position
      dot.style.left = x + "px";
      dot.style.top = y + "px";

      // randomize colors
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      dot.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      this.appendChild(dot);

      setTimeout(() => {
        dot.style.opacity = "0";
      }, 10);

      setTimeout(() => {
        dot.remove();
      }, 1000);
    }
  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
    console.log("in ani-C -teamF");
    parentCanvas.style.overflow = "hidden";
    parentCanvas.style.background = "linear-gradient(to bottom, #1b0ce8 0%, #463bea 50%, #6157ec 70%, #ecdd7b 100%)";
    let sunY = 340;
    let sun = document.createElement('div');
    sun.classList.add('TEAM_F_sun');
    parentCanvas.appendChild(sun);
    function updateSunPosition() {
      sun.style.top = sunY + "px";
    }
    updateSunPosition();

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("f-down");
      if (e.code === 'Space') {
        console.log('Space is pressed');
        e.preventDefault();
        if (sunY >= 40) {
          sunY = sunY - 20;
          updateSunPosition();
        };
      } else if (e.code === 'Backspace') {
        e.preventDefault();
        if (sunY <= 280) {
          sunY = sunY + 20;
          updateSunPosition();
        };
      }
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("f-up");
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
  function aniD(parentCanvas) {
    console.log("in ani-D -teamF");

    // create a canvas inside this parentCanvas
    const canvas = document.createElement("canvas");
    parentCanvas.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // make the canvas match the parent size
    const rect = parentCanvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width);
    canvas.height = Math.floor(rect.height);

    let t = 0; // animation time

    // hand-drawn effect
    function jitter(val, range = 2) {
      return val + (Math.random() - 0.5) * range;
    }

    function drawFace(mouthCurve) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // center the face
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;

      // Face outline
      ctx.fillStyle = "#FFD966"; // skin color
      ctx.beginPath();

      for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
        const x = cx + (radius + (Math.random() - 0.5) * 4) * Math.cos(angle);
        const y = cy + (radius + (Math.random() - 0.5) * 4) * Math.sin(angle);
        if (angle === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();
      ctx.fill();

      // Eyes
      const eyeOffset = Math.sin(t * 3) * 2;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(jitter(cx - radius * 0.4), jitter(cy - radius * 0.35 + eyeOffset, 1), radius * 0.13, 0, Math.PI * 2);
      ctx.arc(jitter(cx + radius * 0.4), jitter(cy - radius * 0.35 + eyeOffset, 1), radius * 0.13, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Mouth (hand drawn curve)
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4 + Math.random(); // slight variation
      ctx.beginPath();

      ctx.moveTo(jitter(cx - radius * 0.55), jitter(cy + radius * 0.45));
      ctx.quadraticCurveTo(
        jitter(cx),
        jitter(cy + radius * 0.45 + mouthCurve, 3),
        jitter(cx + radius * 0.55),
        jitter(cy + radius * 0.45)
      );

      ctx.stroke();
      ctx.closePath();
    }

    function animate() {
      const mouthCurve = Math.sin(t) * (Math.min(canvas.width, canvas.height) * 0.12); // changes from sad to happy
      drawFace(mouthCurve);
      t += 0.02;
      requestAnimationFrame(animate);
    }

    animate();
  }
}
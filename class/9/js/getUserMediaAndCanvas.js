window.onload = getLiveVideo;

async function getLiveVideo() {
    console.log("loaded");
    let video = document.getElementById("video");
    let canvas = document.getElementById("videoCanvas");
    let context = canvas.getContext("2d");

    try {
        let stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 320,
                height: 240,
            },
        });
        video.srcObject = stream;
        console.log(video.srcObject); //here there is something
        /*** instead of using the video object we can use the canvas **/
        requestAnimationFrame(run_pixels);
        function run_pixels() {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            // translate to center and scale on x axis - flip ..
            context.translate(canvas.width / 2, 0);
            context.scale(-1, 1);
            //put onto canvas
            context.drawImage(video, 0, 0, canvas.width / 2, canvas.height);
            context.fillStyle = "#FFFFFF";
            let frame = context.getImageData(0, 0, canvas.width / 2, canvas.height);
            // every pixel has an r,g,b,a value ... and so in the array - every 4 values== 1 pixel
            for (let i = 0; i < frame.data.length; i += 4) {
                let r = frame.data[i];
                let g = frame.data[i + 1];
                let b = frame.data[i + 2];
                let a = frame.data[i + 3];
                frame.data[i] = r;
                frame.data[i + 1] = 0;
                frame.data[i + 2] = 0;
                // make every 8th pixel have an alpha of 0/
                if (i % 32 == 0) {
                    frame.data[i + 3] = 0;
                }

                if (i % 8 === 0) {
                    frame.data[i + 2] = 255;
                }
            }
            context.putImageData(frame, 0, 0);
            context.restore();
            //can draw on top ...
            context.fillRect(0, canvas.height / 2, 50, 50);

            requestAnimationFrame(run_pixels);

            video.style.display = "none"
        }
    } catch (err) {
        /* handle the error */
        console.log("had an error getting the camera");
    }
}
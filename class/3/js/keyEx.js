window.onload = function () {
    console.log("keys");

    let speedX = 5;
    let boxA = document.querySelector("#boxA");

    window.addEventListener("keydown", function (e) {
        // console.log(e.key);
        // console.log(e.keyCode);

        if (e.key === "ArrowRight") {
            let currentPos = parseInt(boxA.style.left);
            boxA.style.left = currentPos + speedX + "px";
        }

        if (e.key === "ArrowLeft") {
            let currentPos = parseInt(boxA.style.left);
            boxA.style.left = currentPos - speedX + "px";
        }

    });
}
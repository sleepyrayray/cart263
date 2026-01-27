window.onload = function () {
    console.log("move");

    let box = document.querySelector("#draw-box-a");
    box.addEventListener("mousemove", drawBoxCallBack);

    let particle = document.createElement("div");
    particle.classList.add("point");
    box.appendChild(particle);

    function drawBoxCallBack(e) {
        // console.log("moving...");
        // console.log(this);
        // console.log(e);
        // console.log(this.getBoundingClientRect());

        let offsetX = e.clientX - this.getBoundingClientRect().x
        let offsetY = e.clientY - this.getBoundingClientRect().y

        particle.style.left = offsetX + "px";
        particle.style.top = offsetY + "px";

        // this.innerHTML = `x: ${offsetX} y: ${offsetY}`;

    }
}
window.onload = setup;
function setup() {
    console.log("events!")

    // let introSection = document.querySelector("#intro");
    // introSection.addEventListener("click", mouseIntroHandler);

    let allSections = document.querySelectorAll(".mouseclick-active-section");
    for (let element of allSections) {
        element.addEventListener("click", changeOpacityOfSection);
    }

    function changeOpacityOfSection(e) {
        // console.log(this);

        // toggle
        if (this.getAttribute("custom-bool") === "inactive") {
            let classToAdd = `${this.id}-section-active`;
            let classToAddP = `${this.id}-section-p-active`;

            this.classList.add(classToAdd);
            document.querySelector(`#${this.id} p`).classList.add(classToAddP);

            this.setAttribute("custom-bool", "active");
        }
        else {
            let classToAdd = `${this.id}-section-active`;
            let classToAddP = `${this.id}-section-p-active`;

            this.classList.remove(classToAdd);
            document.querySelector(`#${this.id} p`).classList.remove(classToAddP);

            this.setAttribute("custom-bool", "inactive");
        }

    }

    function mouseIntroHandler(e) {
        // console.log(this);
        // console.log(e);

        // //a:
        this.style.background = `rgba(214, 110, 239, 0.5)`;

        // console.log(document.querySelector(`#${this.id} p`));
        // document.querySelector(`#${this.id} p`).style.background = `rgba(214, 110, 239 ,.75)`;

        // this.style.setProperty("opacity", ".5");

        document.querySelector(`#${this.id} p`).classList.add("intro-section-p-active");
    };
}
window.onload = goFetch;
async function goFetch() {
    try {
        let response = await fetch('../files/tests.json');
        let data = await response.json();
        console.log(data);
        displayResults(data);
    }
    catch (err) {
        console.log(err)
    }

    function displayResults(parsedResultJS) {
        for (let i = 0; i < parsedResultJS.length; i++) {
            console.log(parsedResultJS)

            //the object
            let donutObj = parsedResultJS[i];
            //container
            let containerDiv = document.createElement("div");
            containerDiv.classList.add("donutItem");
            document.querySelector("#output").appendChild(containerDiv);

            let title = document.createElement("h3");
            title.textContent = donutObj.name;
            containerDiv.appendChild(title)

            //access the image
            let donutImage = document.createElement("img");
            donutImage.src = donutObj.image;
            containerDiv.appendChild(donutImage)
        }

    }

}
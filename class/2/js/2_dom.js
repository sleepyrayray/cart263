window.onload = setup
function setup() {
    // console.log("running setup");

    // console.log(document.getElementById("one"));
    // // accepts any css type selector
    // // returns first one that it finds
    // console.log(document.querySelector("#one"));

    // // returns a collections (array)
    // console.log(document.getElementsByTagName("div"));
    // let allDivs = document.getElementsByTagName("div");
    // console.log(allDivs[0]);

    // console.log(document.querySelector("div"));
    // // returns a nodelist (array)
    // console.log(document.querySelectorAll("div"));

    // // returns collections (array)
    // console.log(document.getElementsByClassName("square_shape"));

    // // this includes tags
    // console.log(document.getElementById("two").innerHTML);
    // // this ignores tags
    // console.log(document.getElementById("two").textContent);

    // // returns the attribute of the class with id="five"
    // console.log(document.querySelector("#five").getAttribute("class"));

    // console.log(document.querySelector("#two").classList);

    // console.log(document.querySelector("#one").style);
    // console.log(document.querySelector("#one").style.background);

    // MODIFYING DOM ELEMENTS
    console.log(document.querySelectorAll("span")[0].parentElement);

    console.log(document.querySelector(".wrapper_flex_box").children);

    document.querySelector("#two").children[0].innerHTML = "<h2> this is now a header</h2>";

    //get the group
    let allSquareShapes = document.querySelectorAll(".square_shape");
    //go through each element
    for (let singleSquareShape of allSquareShapes) {
        //get children
        console.log(singleSquareShape.children[0])
        singleSquareShape.children[0].textContent += "adding content"
    }

    // adding element
    //new element
    let newDiv = document.createElement("div");
    newDiv.classList.add("square_shape");
    newDiv.innerHTML = " NEW ELEMENT ";
    newDiv.style.backgroundColor = "purple";
    // access parent element
    let parentElement = document.querySelector(".wrapper_flex_box")
    parentElement.appendChild(newDiv)

    let parentElementToRemoveFrom = document.querySelector(".wrapper_flex_box")
    let toRemove = document.getElementById("six");
    parentElementToRemoveFrom.removeChild(toRemove);
}
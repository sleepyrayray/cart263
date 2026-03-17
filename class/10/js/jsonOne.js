window.onload = function () {
    console.log("hello json");

    let donut_as_json = {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "image": "../images/donuts/b.png",
        "flavours": [
            { "id": "1001", "type": "Regular" },
            { "id": "1002", "type": "Chocolate" },
            { "id": "1003", "type": "Blueberry" },
            { "id": "1004", "type": "Devil's Food" },
        ],

        "toppings": [
            { "id": "5001", "type": "None" },
            { "id": "5002", "type": "Glazed" },
            { "id": "5005", "type": "Sugar" },
            { "id": "5007", "type": "Powdered Sugar" },
            { "id": "5006", "type": "Chocolate with Sprinkles" },
            { "id": "5003", "type": "Chocolate" },
            { "id": "5004", "type": "Maple" },
        ],
    };

    let donut_as_json_array = [
        {
            "id": "0001",
            "type": "donut",
            "name": "Cake",
            "image": "../images/donuts/donut_b.png",
            "flavours": [
                {
                    "id": "1001",
                    "type": "Regular",
                },
                {
                    "id": "1002",
                    "type": "Chocolate",
                },
                {
                    "id": "1003",
                    "type": "Blueberry",
                },
                {
                    "id": "1004",
                    "type": "Devil's Food",
                },
            ],
            "toppings": [
                "None",
                "Glazed",
                "Sugar",
                "Powdered Sugar",
                "Chocolate with Sprinkles",
                "Chocolate",
                "Maple",
            ],
        },
        {
            "id": "0002",
            "type": "donut",
            "name": "Raised",
            "image": "../images/donuts/donut_a.png",
            "flavours": [
                {
                    "id": "1001",
                    "type": "Regular",
                },
            ],
            "toppings": ["None", "Glazed", "Sugar", "Chocolate", "Maple"],
        },
        {
            "id": "0003",
            "type": "donut",
            "name": "Old Fashioned",
            "image": "../images/donuts/donut_f.png",
            "flavours": [
                {
                    "id": "1001",
                    "type": "Regular",
                },
                {
                    "id": "1002",
                    "type": "Chocolate",
                },
            ],
            "toppings": ["None", "Glazed", "Chocolate", "Maple"],
        },
    ];

    let headingTag = document.createElement("h2");
    headingTag.classList.add("donut_name_class");
    document.getElementById("output_rev").appendChild(headingTag);
    headingTag.innerHTML = `Donut Name : ${donut_as_json.name}`;

    let flavoursArray = donut_as_json.flavours;
    //make a for loop and iterate
    for (flavour of flavoursArray) {
        console.log(flavour);
        let pTag = document.createElement("p");
        pTag.classList.add("donut_flavour_class");
        document.getElementById("output_rev").appendChild(pTag);
        pTag.innerHTML = `Donut flavour : ${flavour.type}`;
    }

    let toppingsArray = donut_as_json.toppings;
    for (topping of toppingsArray) {
        console.log(topping.type);
        let pTag = document.createElement("p");
        pTag.classList.add("donut_topping_class");
        document.getElementById("output_rev").appendChild(pTag);
        pTag.innerHTML = `Donut topping : ${topping.type}`;
    };

    for (let i = 0; i < donut_as_json_array.length; i++) {
        let headingTag = document.createElement("h2");
        headingTag.classList.add("donut_name_class");
        document.getElementById("output_rev").appendChild(headingTag);
        headingTag.innerHTML = `Donut Name : ${donut_as_json_array[i].name}`;
        let imageTag = document.createElement("img");
        document.getElementById("output_rev").appendChild(imageTag);
        imageTag.src = ` ${donut_as_json_array[i].image}`;
    }
}
window.onload = function () {
	// FOR BUILDING THE EXAMPLES :)
	const allRows = document.querySelectorAll(".flex-row");
	let arrayOfShapes_One = [];
	//INIT ONE:
	for (let i = 0; i < 10; i++) {
		let color = { r: (255 - i * 10), g: 50, b: 100 };
		arrayOfShapes_One.push(
			new CustomShape((i + 1) * 55, 50, "shape", "rectangle", color)
		);
	}
	add_elements_to_dom(arrayOfShapes_One, allRows[0]);
	//INIT TWO:
	//INIT THREE
	//INIT FOUR


	function mapArraysShape(arrayOfShapes, row) {
		// MAP ONE
		let arrayOfShapesNew = arrayOfShapes.map(changeShape);
		add_elements_to_dom(arrayOfShapesNew, row);

		function changeShape(el) {
			return (
				/* need to make a copy */
				new CustomShape(el.x, el.y + 100, el.shapeClass, "circle", el.color)
			)
		}
	}

	document
		.querySelector("#mapButtonA")
		.addEventListener("click", function () {
			mapArraysShape(arrayOfShapes_One, allRows[0])
		});

	function mapArraysColor(arrayOfShapes, row) {
		// MAP TWO
		let arrayOfShapesNew = arrayOfShapes.map(changeColor);
		add_elements_to_dom(arrayOfShapesNew, row);


		function changeColor(el) {
			//take red color
			let newColor = { r: el.color.r, g: 125, b: 255 }
			return (
				/* need to make a copy */
				new CustomShape(el.x, el.y + 200, el.shapeClass, el.customShapeClass, newColor)
			)
		}
	}

	document
		.querySelector("#mapButtonB")
		.addEventListener("click", function () {
			mapArraysColor(arrayOfShapes_One, allRows[0])
		});
}
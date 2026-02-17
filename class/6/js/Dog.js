class Dog extends Animal {
    // Create a new Dog object that moves to the right
    constructor(x, y, width, height) {

        // Animal constructor (parent constructor)
        super(x, y, width, height);

        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;

        this.vx = Math.random() * 5 + 1;
        this.vy = 0;
        this.animalBody = document.createElement("div");

        this.isjumping = false;
    }

    jump() {
        // console.log("jump");
        this.isjumping = true;
        this.vy = -27; //speed to go up
    }

    updateJump() {
        //check if I am on the "ground" i.e. y of dog is > or equal to 150
        if (this.y < 150) {
            this.vy += 1; //speed of drop
        }
        //stop jumping
        else {
            this.isjumping = false;
            this.vy = 0; //reset y speed
            this.y = 100; //reset y value
        }
    }

    // catch bird :()
    catchBird(bird) {
        let birdEl = bird.animalBody.getBoundingClientRect();
        let dogBody = this.animalBody.getBoundingClientRect();
        let d = distance(birdEl.x, birdEl.y, dogBody.x, dogBody.y)

        if (d < 50) {
            console.log("collision")
            console.log(bird.animalBody.style.background)
            bird.animalBody.style.background = `orange`

        }
    }

    // // Move the Dog according to its velocity
    // move() {
    //     this.x += this.vx;
    //     this.y += this.vy;
    //     //update the actual div...
    //     this.animalBody.style.left = this.x + "px";
    //     this.animalBody.style.top = this.y + "px";
    // }

    // // Wrap the dog if it reaches the right edge
    // wrap() {
    //     if (this.x > window.innerWidth) {
    //         this.x -= window.innerWidth;
    //     }
    // }

    // Display the dog as a ellipse
    renderAnimal() {

        // call Animal (parent) method
        super.renderAnimal();

        // this.animalBody.classList.add("animal");
        // this.animalBody.style.width = this.width + "px";
        // this.animalBody.style.height = this.height + "px";
        // this.animalBody.style.left = this.x + "px";
        // this.animalBody.style.top = this.y + "px";
        // this.animalBody.style.borderRadius = this.width + "px";
        //add to the DOM
        document.getElementsByClassName("grass")[0].appendChild(this.animalBody);
    }
}

/*
The Euclidean distance between two points is the length of the line segment connecting them. 
The formula for calculating it in 2D is equal to the hypotenuse of a right triangle, 
given by the Pythagorean theorem.
*/

function distance(x0, y0, x1, y1) {
    return Math.hypot(x1 - x0, y1 - y0);
}
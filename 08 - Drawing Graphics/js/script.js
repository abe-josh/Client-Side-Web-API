function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**FIRST CANVAS */
const canvas = document.querySelector('.myCanvas1');
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext('2d');

ctx.fillStyle = "rgb(0 0 0)";
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = "rgb(255 0 255 / 75%)"; //side view purple
ctx.fillRect(25, 100, 175, 50);
ctx.fillStyle = "rgb(0 255 0)"; // side view lime
ctx.fillRect(75, 75, 100, 100);
ctx.fillStyle = "rgb(255 0 0)"; //side view red
ctx.fillRect(50, 50, 100, 150);

ctx.strokeStyle = "rgb(255 255 255)"; //border side view
ctx.lineWidth = 5;
ctx.strokeRect(25, 25, 175, 200);


ctx.fillStyle = "rgb(255 0 0)"; // top view red
ctx.fillRect(300, 50, 150, 150);
ctx.fillStyle = "rgb(0 255 0)"; // top view green
ctx.fillRect(325, 75, 100, 100);
ctx.fillStyle = "rgb(255 0 255)"; // top view purple
ctx.fillRect(350, 100, 50, 50);

ctx.strokeStyle = "rgb(255 255 255)"; //border top view
ctx.lineWidth = 5;
ctx.strokeRect(375, 50, 0, 150); 



/**SECOND CANVAS */
const canvas2 = document.querySelector('.myCanvas2');
const width2 = (canvas2.width = window.innerWidth);
const height2 = (canvas2.height = window.innerHeight);
const ctx2 = canvas2.getContext('2d');

ctx2.fillStyle = "rgb(255 0 255 / 75%)"; //side view purple
ctx2.fillRect(25, 100, 175, 50);
ctx2.fillStyle = "rgb(0 255 0)"; // side view lime
ctx2.fillRect(75, 75, 100, 100);
ctx2.fillStyle = "rgb(255 0 0)"; //side view red
ctx2.fillRect(50, 50, 100, 150);

ctx2.strokeStyle = "rgb(0 0 0)"; //border side view
ctx2.lineWidth = 5;
ctx2.strokeRect(25, 25, 175, 200);


ctx2.fillStyle = "rgb(255 0 0)"; // top view red
ctx2.fillRect(300, 50, 150, 150);
ctx2.fillStyle = "rgb(0 255 0)"; // top view green
ctx2.fillRect(325, 75, 100, 100);
ctx2.fillStyle = "rgb(255 0 255)"; // top view purple
ctx2.fillRect(350, 100, 50, 50);

ctx2.strokeStyle = "rgb(0 0 0)"; //border top view
ctx2.lineWidth = 5;
ctx2.strokeRect(375, 50, 0, 150); 


/**THIRD CANVAS */
const canvas3 = document.querySelector('.myCanvas3');
const width3 = (canvas3.width = window.innerWidth);
const height3 = (canvas3.height = window.innerHeight);
const ctx3 = canvas3.getContext('2d');

ctx3.strokeStyle = "rgb(0 255 0)";
ctx3.lineWidth = 5;
ctx3.strokeRect(0, 0, width3, height3);


/**DRAWING AN INVERTED TRIANGLE */
ctx3.fillStyle = "rgb(255 0 0)";
ctx3.beginPath();
ctx3.moveTo(50, 50);

// lineTo(first_parameter, second_parameter)
// first parameter: away from left side along the x-axis
// second_parameter: away from top side along the y-axis
ctx3.lineTo(150, 50);
const triHeight = 50 * Math.tan(degToRad(60));
console.log(triHeight);
ctx3.lineTo(100, 50 + triHeight);
ctx3.lineTo(50, 50);
ctx3.fill();


/**DRAWING A CIRCLE */
ctx3.fillStyle = "rgb(0 0 255)";
ctx3.beginPath();
ctx3.arc(150, 106, 50, degToRad(0), degToRad(360), false);
ctx3.fill();

/**DRAW PAC-MAN SHAPED OBJECT */
ctx3.fillStyle = "yellow";
ctx3.beginPath();
ctx3.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
ctx3.lineTo(200,106); 
ctx3.fill();




/**DRAW TEXT TO CANVAS */
const canvas4 = document.querySelector('.myCanvas4');
const width4 = (canvas4.width = window.innerWidth);
const height4 = (canvas4.height = window.innerHeight);
const ctx4 = canvas4.getContext('2d');

ctx4.strokeStyle = "rgb(0 255 255)";
ctx4.lineWidth = 5;
ctx4.strokeRect(0, 0, width4, height4);

ctx4.strokeStyle = "black";
ctx4.lineWidth = 2;
ctx4.font = "36px arial";
ctx4.strokeText("Canvas text",  50, 50);

ctx4.fillStyle = "red";
ctx4.font = "48px georgia";
ctx4.fillText("Canvas text", 50, 150);

canvas4.setAttribute("aria-label", "Canvas text");



/**IMAGES TO CANVAS */
const canvas5 = document.querySelector('.myCanvas5');
const width5 = (canvas5.width = window.innerWidth);
const height5 = (canvas5.height = window.innerHeight);
const ctx5 = canvas5.getContext('2d');

ctx5.strokeStyle = "rgb(142 123 212)";
ctx5.lineWidth = 5;
ctx5.strokeRect(0, 0, width5, height5);

const image = new Image();
image.src = "./images/firefox.png";

console.log(`image object ::::: ${image}`);
console.log(image);

image.addEventListener('load', () => ctx5.drawImage(image, 20, 20, 185, 175, 50, 50, 185, 175));

//add a "accessible description" to the image
canvas.setAttribute("aria-label", "Firefox logo");


/**LOOPS AND ANIMATIONS IN A CANVAS */
const canvas6 = document.querySelector('.myCanvas6');
const width6 = (canvas6.width = window.innerWidth);
const height6 = (canvas6.height = window.innerHeight);
const ctx6 = canvas6.getContext('2d');

ctx6.strokeStyle = "rgb(183 98 49)";
ctx6.lineWidth = 5;
ctx6.strokeRect(0, 0, width6, height6);

ctx6.translate(width6 / 2, height / 2);

let length = 250;
let moveOffset = 20;

for(let i = 0; i < length; i++) {
    ctx6.fillStyle = `rgb(${255 - length} 0 ${255 - length} / 90%)`;
    ctx6.beginPath();
    ctx6.moveTo(moveOffset, moveOffset);
    ctx6.lineTo(moveOffset + length, moveOffset);
    const triHeight = (length / 2) * Math.tan(degToRad(60));
    ctx6.lineTo(moveOffset + length / 2, moveOffset + triHeight);
    ctx6.lineTo(moveOffset, moveOffset);
    ctx6.fill();

    length--;
    moveOffset += 0.7;
    ctx6.rotate(degToRad(5));
}



/**ANIMATION IN CANVAS */
const canvas7 = document.querySelector('.myCanvas7');
const width7 = (canvas7.width = window.innerWidth);
const height7 = (canvas7.height = window.innerHeight);
const ctx7 = canvas7.getContext('2d');

ctx7.strokeStyle = "rgb(34 64 135)";
ctx7.lineWidth = 5;
ctx7.strokeRect(0, 0, width7, height7);

ctx7.translate(width7 / 2, height7 / 2);

const manImage = new Image();
manImage.src = "./images/walk-right.png";
manImage.onload = draw;

let sprite = 0;
let posX = 0;

function draw(){
    ctx7.fillRect(-(width7 / 2), -(height7 / 2), width7, height7);

    ctx7.drawImage(manImage, sprite * 102, 0, 102, 148, 0 + posX, -74, 102, 148);

    if(posX % 13 === 0) {
        if(sprite === 5){
            sprite = 0;
        }
        else {
            sprite++;
        }
    }

    if(posX > width / 2) {
        let newStartPos = -(width7 / 2 + 102);
        posX = Math.ceil(newStartPos);
        console.log(posX);
    }
    else {
        posX += 2;
    }
    window.requestAnimationFrame(draw);
}



/**SKETCH PAD */
const canvas8 = document.querySelector('.myCanvas8');
const width8 = (canvas8.width = window.innerWidth);
const height8 = (canvas8.height = window.innerHeight);
const ctx8 = canvas8.getContext('2d');

// ctx8.strokeStyle = `rgb(${rand(0, 255)} ${rand(0, 255)} ${rand(0, 255)})`;
// ctx8.lineWidth = 5;
// ctx8.strokeRect(0, 0, width8, height8);

const colorPicker = document.querySelector('.colorPicker');
const penSize = document.querySelector('.penSize');
const clearBtn = document.querySelector('.clearBtn');

console.log("color ::::: " + colorPicker.value);
console.log("pen size ::::: " + penSize.value);

let currentY;
let currentX;
let pressed = false;

// update mouse pointer coordinates
canvas8.addEventListener('mousemove', (e) => {
    const rect = canvas8.getBoundingClientRect();
    currentX = e.pageX - rect.left;
    currentY = e.pageY - rect.top;
    console.log("current x ::::: " + currentX);
    console.log("current y ::::: " + currentY);
});

canvas8.addEventListener('mousedown', () => {
    console.log("mousedown");
    // drawOnSketch();
    pressed = true;
    console.log(pressed);
});

canvas8.addEventListener('mouseup', () => {
    console.log("mouseup");
    pressed = false;
});

clearBtn.addEventListener('click', () => {
    ctx8.fillStyle = "rgb(255 255 255)";
    ctx8.fillRect(0, 0, width8, height8);
})

function drawOnSketch() {
    if(pressed){
        ctx8.fillStyle = colorPicker.value;
        ctx8.beginPath();
        ctx8.arc(
            currentX,
            currentY - 2500,
            penSize.value,
            degToRad(0),
            degToRad(360),
            false,
        );
        ctx8.fill();
    }
    requestAnimationFrame(drawOnSketch);
}

drawOnSketch();




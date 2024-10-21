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
document.addEventListener('mousemove', (e) => {
    currentX = e.pageX;
    currentY = e.pageY;
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
            currentY - 100,
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

function degToRad(degrees) {
    return (degrees * Math.PI) / 180;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
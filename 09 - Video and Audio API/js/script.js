const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rewind = document.querySelector('.rwd');
const forward = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

media.removeAttribute('controls');
controls.style.visibility = "visible";

// event listener for play button that let the video/media to play/pause
play.addEventListener('click', playPauseMedia);

//
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);

rewind.addEventListener('click', mediaBackward);
forward.addEventListener('click', mediaForward);

media.addEventListener('timeupdate', setTime);

function playPauseMedia() {
    rewind.classList.remove("active");
    forward.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    if(media.paused) {
        play.setAttribute("data-icon", "u");
        media.play();
    }
    else {
        play.setAttribute("data-icon", "P");
        media.pause();
    }
}

function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute("data-icon", "P");
    rewind.classList.remove("active");
    forward.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

let intervalFwd;
let intervalRwd;

function mediaBackward() {
    clearInterval(intervalFwd);
    forward.classList.remove("active");

    if(rewind.classList.contains("active")) {
        rewind.classList.remove("active");
        clearInterval(intervalRwd);
        media.play();
    }
    else {
        rewind.classList.add("active");
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    clearInterval(intervalRwd);
    rewind.classList.remove("active");

    if(forward.classList.contains("active")) {
        forward.classList.remove("active");
        clearInterval(intervalFwd);
        media.play();
    }
    else {
        forward.classList.add("active");
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if(media.currentTime <= 3) {
        rewind.classList.remove("active");
        clearInterval(intervalRwd);
        stopMedia();
    }
    else {
        media.currentTime -= 3;
    }
}

function windForward() {
    if(media.currentTime >= media.duration - 3) {
        forward.classList.remove("active");
        clearInterval(intervalFwd);
        stopMedia();
    }
    else {
        media.currentTime += 3;
    }
}

console.log("timerWrapper client width" + timerWrapper.clientWidth);

function setTime() {
    const minutes = Math.floor(media.currentTime / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, "0");
    const secondsValue = seconds.toString().padStart(2, "0");

    const mediaTime = `${minuteValue}:${secondsValue}`;
    timer.textContent = mediaTime;

    const barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = `${barLength}px`;
    console.log("timebar width " + timerBar.clientWidth);
}

timerWrapper.addEventListener('click', (e) => {
    console.log( "e.pageX :::: " + e.pageX);
    console.log( "e.pageY :::: " + e.pageY);

    const rect = timerWrapper.getBoundingClientRect();

    console.log(`rect left :::: ${(e.pageX - rect.left) - 9}`);
    console.log( "rect top :::: " + rect.top);

});
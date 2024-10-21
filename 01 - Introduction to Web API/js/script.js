const audioCtx = new AudioContext();

const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('button');
const volumeSlider = document.querySelector('.volume');

const audioSource = audioCtx.createMediaElementSource(audioElement);

console.log("audioCtx ::::: " + audioCtx.toString());
console.log("audioCtx ::::: " + audioSource);

console.log(audioCtx);


// play/pause audio
playBtn.addEventListener("click", () => {
    // check if context is in suspended state (autoplay policy)
    if(audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    //**if track is stopped, play it
    //checks if the class attribute of the button is equal to "paused"
    if(playBtn.getAttribute("class") === "paused") {
        //plays the track
        audioElement.play();

        //set the class attribute of the playBtn to "playing"
        playBtn.setAttribute("class", "playing");

        //change the text of the playBtn to "Paused"
        playBtn.textContent = "Paused"; 
    }
    //if the track is playing, stop it
    //check if the class attribute of playBtn is equal to "playing"
    else if(playBtn.getAttribute("class")  === "playing"){
        //pauses the track
        audioElement.pause();

        //sets the class attribute of playBtn to "paused"
        playBtn.setAttribute("class", "paused");

        //change text of playBtn to "Play"
        playBtn.textContent = "Play";
    }
});

//if track ends
audioElement.addEventListener("ended", () => {
    playBtn.setAttribute("class", "paused");
    playBtn.textContent = "Play";
});


//**Adjusting the Volume */
const gainNode = audioCtx.createGain();
console.log(gainNode);

volumeSlider.addEventListener("input", () => {
    gainNode.gain.value = volumeSlider.value;
});

audioSource.connect(gainNode).connect(audioCtx.destination);





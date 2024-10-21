const verseChoose = document.querySelector('select');
const poemDisplay = document.querySelector('pre');

verseChoose.addEventListener('change', () => {
    const verse = verseChoose.value;
    console.log(verse);
    updateDisplay(verse);

});

function updateDisplay(verse) {
    // switch(verse) {
    //     case 'Verse 1':
    //         const getVerse = fetch(`./assets/verse1.txt`);
    //         poemDisplay.textContent = JSON.stringify(getVerse);
    //         break;
    //     case 'Verse 2':
    //         poemDisplay.textContent = `./assets/verse2.txt`;
    //         break;
    //     case 'Verse 3':
    //         poemDisplay.textContent = `./assets/verse3.txt`;
    //         break;
    //     case 'Verse 4':
    //         poemDisplay.textContent = `./assets/verse4.txt`;
    //         break;        
    // }

    verse = verse.replace(" ", "").toLowerCase();
    const url = `./assets/${verse}.txt`;
    console.log(url)

    //using Fetch API
    //Call fetch(), passing in the URL
    fetch(url)
        //fetch() returns a promise. When we have received a response from the server
        //the promise's "then()" handler is called with the response
        .then((response) => {
            console.log(response);
            // console.log(response.text());
            //our handler throws an error if the request did not succed
            if(!response.ok){
                throw new Error(`HTTP error : ${response.status}`);
            }
            //otherwise (if the response succeeded), our handler fetches the response text by calling response.text(), and immediately returns the promise
            return response.text();
        })
        //when response.text() has succeeded, the "then()" handler is called with the text, and we copy it into the "poemDisplay" box
        .then((text) => {
            console.log(text);
            poemDisplay.textContent = text;
            // document.querySelector('body').appendChild(poemDisplay);
        })
        //catch any errors that might happen, and display a message in the "poemDisplay" box
        .catch((error) => {
            poemDisplay.textContent = `Could not fetch verse " ${error}`;
        });
}


updateDisplay("Verse 1");

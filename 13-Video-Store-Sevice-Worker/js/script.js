// create constants
const section = document.querySelector('section');
const videos = [
    { 'name' : 'crystal'},
    { 'name' : 'elf'},    
    { 'name' : 'frog'},    
    { 'name' : 'monster'},    
    { 'name' : 'pig'},    
    { 'name' : 'rabbit'},    
];

// create an instance of a db object for use to store our database
let db;

function init() {   
    // loop through the video names one by one
    for(const video of videos) {
        // open transaction, get object store, and get() each video by name
        const objStore = db.transaction('videos_os').objectStore('videos_os');
        const request = objStore.get(video.name);
        request.addEventListener('success', () => {

            console.log(video.name + " result ::::: " + request.result);
            console.log(request);
            
            // if the result exists in the database (is not undefined)
            if(request.result) {
                // grab the videos from IDB and display them using displayVideo()
                console.log("taking videos fron IDB");
                displayVideo(request.result.mp4, request.result.webm, request.result.name);
            }
            else {
                // fetch the videos from the network
                fetchVideoFromNetwork(video);
            }
        });
    }
}

// define the fetchVideoFromNetwork() function
function fetchVideoFromNetwork(video) {
    console.log("fetching videos from network");

    //fetch the MP4 and WebM version of the video using the fetch() function, then expose their response bodies as blobs
    const mp4Blob = fetch(`./videos/${video.name}.mp4`).then(response => {
        console.log("inside response.blob()");
        console.log(response);
        return response.blob();
    });

    const webmBlob = fetch(`./videos/${video.name}.webm`).then(response => response.blob());

    // only run the next code when both promises have fulfilled
    Promise.all([mp4Blob, webmBlob]).then(values => {
        console.log("promise.all() values ::::: ");

        values[0].text().then((text) => {
            console.log("inside mp4Blob.text()");
            console.log(text);
        });
        
        console.log(values);
        // display the video fetched from the network with displayVideo()
        displayVideo(values[0], values[1], video.name);

        // store it in the IDB using storeVideo()
        storeVideo(values[0], values[1], video.name);
    });
}

// define the storeVideo() function
function storeVideo(mp4Blob, webmBlob, name) {

    console.log("inside storeVideo ::::: ");
    console.log("inside storeVideo mp4Blob ::::: " + mp4Blob);
    console.log("inside storeVideo webmBlob ::::: " + webmBlob);
    console.log("inside storeVideo name ::::: " + name);


    // open transaction, get object store; make it a readwrite so we can write to the IDB
    const objStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');

    // create a record to add to the IDB
    const record = {
        mp4 : mp4Blob,
        webm : webmBlob,
        name : name,
    }

    //Add the record to the IDB using add()
    const request = objStore.add(record);

    request.addEventListener('success', () => console.log("Record addition attempt success!"));
    request.addEventListener('error', () => console.log(request.error));
}


// define the displayVideo() function
function displayVideo(mp4Blob, webmBlob, title) {

    console.log("inside displayVideo mp4Blob ::::: " + mp4Blob);
    console.log("inside displayVideo webmBlob ::::: " + webmBlob);
    console.log("inside displayVideo title ::::: " + title);

    // create object URLs out of the blobs
    const mp4URL = URL.createObjectURL(mp4Blob);
    const webmURL = URL.createObjectURL(webmBlob);

    // create DOM elements to embed video in the page
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = title;

    const video = document.createElement('video');
    video.controls = true;

    const source1 = document.createElement('source');
    source1.src = mp4URL;
    source1.type = 'video/mp4';

    const source2 = document.createElement('source');
    source2.src = webmURL;
    source2.type = 'video/webm';

    // embed DOM elements into page
    section.appendChild(article);
    article.appendChild(h2);
    article.appendChild(video);
    video.appendChild(source1);
    video.appendChild(source2);
}

// open our database; it is created if it doesn't already exist
const request = window.indexedDB.open('videos_db', 1);

// error handler signifies that the database didn't open successfully
request.addEventListener('error', () => {
    console.error("Database failed to open.");
})

// success handler signifies that the database open successfully
request.addEventListener('success', () => {
    console.log("Database opened successfully!");

    console.log("DB request result " + request);
    // store the opened database object in the db variable. This is used a lot below
    db = request.result;
    init();
});

// setup the database tables if this has not already been done
request.addEventListener('upgradeneeded', e => {
    
    console.log("inside upgradeneeded ::::: " + e.target.result);
    console.log(e.target.result);
    // grab a reference to the opened database
    const db = e.target.result;

    // create an objectStore to store our videos in (basically like a single table) including a auto-incrementing key
    const objStore = db.createObjectStore('videos_os', { keyPath: 'name'});

    // define what data items the objectStore will contain
    objStore.createIndex('mp4', 'mp4', {unique : false});
    objStore.createIndex('webm', 'webm', {unique : false});

    console.log("Database setup complete");
});


// register service worker to control making site work offline
if('serviceWorker' in navigator) {
    console.log("trueeee");
    navigator.serviceWorker
        .register('./sw.js')
        .then(() => console.log("Service Worker Registered!"));
}
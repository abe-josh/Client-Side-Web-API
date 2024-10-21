// define the baseURL and key to as part of the request URL

const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const key = "oT7sUsdy2lmdXw5CAmEyp55CkIAeXtIG";

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');
const pageNum = document.querySelector('.pageNum');

const submitBtn = document.querySelector('.submit');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;

//Event listeners to control the functionality

// searchForm.addEventListener('submit', (e) => {
//     const startDateValue = startDate.value.replaceAll("-", "");
//     const endDateValue = endDate.value.replaceAll("-", "");
//     console.log(searchTerm);
//     console.log(`searchTerm value ::::: ${searchTerm.value}`);
//     console.log(startDate);
//     console.log(`start-date value ::::: ${startDateValue}`);
//     console.log(endDate);
//     console.log(`end-date value ::::: ${endDateValue}`);

//     const url = `${baseURL}?q=${searchTerm.value}&api-key=${key}`
//     const fetchArticle = fetch(`${url}`);

//     fetchArticle
//         .then((response) => {
//             console.log(response);
//             console.log(`inside response :::::: ${response}`);
//             if(!response.ok) {
//                 throw new Error(`Error in sending request`);
//             }
//             // console.log(response.json());
//             return response.json();
//         })
//         .then((data) => {
//             console.log(`inside .then(data) ::::: ${data.response.docs}`);
//             console.log(data);
//             const articles = data.response.docs;

//             for(const article of articles) {
//                 const title = document.createElement('h2');
//                 title.textContent = article.headline.main;

//                 const leadPara = document.createElement('p');
//                 leadPara.textContent = article.lead_paragraph;

//                 console.log(article);
//                 console.log(title.textContent);



//                 const keyword = document.createElement('ul');
//                 keyword.textContent = "Keywords: ";

//                 for(const word of article.keywords){
//                     const kWord = document.createElement('li');
//                     kWord.textContent = word.value;

//                     keyword.appendChild(kWord);
//                 }

//                 section.appendChild(title);
//                 section.appendChild(leadPara);
//                 section.appendChild(keyword);
//             }
//         })
//         .catch((error) => console.error(`Error : ${error}`));
//     e.preventDefault();
// });

searchForm.addEventListener('submit', submitSearch);
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', previousPage);

function submitSearch(e) {
    pageNumber = 0;
    fetchResults(e);
}

function fetchResults(e) {
    // use preventDefault() to stop the form submitting
    e.preventDefault();

    // Assembe the full Request URL
    let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

    if(startDate.value !== "") {
        url = `${url}&begin_date=${startDate.value}`;
    }

    if(endDate.value !== "") {
        url = `${url}&end_date=${endDate.value}`;
    }

    // use fetch() to make the request to the API
    fetch(url)
        .then((response) => response.json())
        .then((json) => displayResults(json))
        .catch((error) => console.error(`Error fetching data: ${error.message}`));
}

function displayResults(json) {
    // delete all the content of DOM element (section)
    // checks if the "section" has a first child, and if it does, loops until there is no child element inside "section" element
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }

    // this array (articles) will hold all the objects that represent the articles returned by the search
    const articles = json.response.docs;
    console.log("articles returned ::::: " + articles);
    console.log(articles);


    // checks to see if the response has returned articles, if it does, "nav" element will be displayed. The "nav" element contains the "previous" and "next" buttons that will be use for pagination
    // if fewer than 10 articles, they will fit on a single page
    nav.style.display = articles.length === 10 ? "flex" : "none";

    // checks to see if no articles are returned.
    // display the message if there is no article/s returned
    if(articles.length === 0){
        const para = document.createElement('p');
        para.textContent = "No results returned.";
        section.appendChild(para);
    }
    // loop through the article/s returned and create DOM elements to display the part of the article
    else {
        for(const content of articles) {
            const article = document.createElement('article');
            const heading = document.createElement('h2');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const para1 = document.createElement('p');
            const keyword = document.createElement('p');
            keyword.classList.add('keywords');

            console.log(content);

            link.href = content.web_url;
            link.textContent = content.headline.main;
            para1.textContent = content.snippet;
            keyword.textContent = "Keywords: ";

            // loop through all the keywords associated with the article
            // create a "span" element and put each keyword as it's text content
            for(const word of content.keywords) {
                const span = document.createElement('span');
                span.textContent = `${word.value} `;
                keyword.appendChild(span);
            }

            // check if the article has any images associated with it. Contain the image in the "img" element if exists
            if (content.multimedia.length > 0){
                img.src = `https://www.nytimes.com/${content.multimedia[0].url}`;
                img.alt = content.headline.main;
            }

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para1);
            article.appendChild(keyword);
            section.appendChild(article);
        }
    }
}

function nextPage(e){
    pageNumber++;
    // pageNum.textContent = parseInt(pageNum.value) + 1;
    console.log(e);
    fetchResults(e);
}

function previousPage(e){  
    if(pageNumber > 0){  
        pageNumber--; 
        // pageNum.textContent = parseInt(pageNum.value) - 1;
    }
    // returns out of the page if the pagenumber is 0
    else{
        return;
    }
    fetchResults(e);
}

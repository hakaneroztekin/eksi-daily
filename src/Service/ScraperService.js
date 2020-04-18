
const URL = "https://eksisozluk.com/basliklar/gundem";

let cheerio = require('cheerio');

export function scrape(filterCount, callback) {
    console.log("Scrape is called");
    let topics = [];
    //scrapeLeftFrame();
    //callback(topics);
}

// Scrape "Sol Başlık" on the website
function scrapeLeftFrame() {
    let scraper = cheerio.load(URL);

    // For each .item, we add all the structure of a company to the companiesList array
    // Don't try to understand what follows because we will do it differently.
    scraper('html.no-touch body.light-theme.theme-disabled div#container div#index-section.robots-nocontent.main-left-frame nav#partial-index ul.topic-list.partial').each(function(index, element){
        console.log("index");
        console.log(index);
        console.log("element");
        console.log(element);
    });

    console.log("scraped left frame"); // Output the data in the terminal
}

/*export function getFilteredArticlesByCategory(category, callback) {
    let filteredArticles = [];
    console.log("category");
    console.log(category);
    executeHTTPRequest(null, 'GET', '/article/get/all', (articles) => {
        articles.forEach(article => {
            if (article['category'] === category) {
                filteredArticles.push(article);
            }
        });
        callback(filteredArticles);
    });
}

function executeHTTPRequest(value, request, endpoint, callback) {
    endpoint = API_URL + endpoint;
    if (request === 'GET') {
        get(endpoint, callback);
    } else if (request === 'POST') {
        console.log("not implemented");
        // post(value, endpoint, callback);
    } else if (request === 'DELETE') {
        console.log("not implemented");
        // deleteRequest(value, endpoint);
    } else if (request === 'PUT') {
        console.log("not implemented");
        // update(value, endpoint);
    }
}

function get(endpoint, callback) {
    let request = new XMLHttpRequest();
    // console.log("GET from " + endpoint);
    request.open('GET', endpoint);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.addEventListener('load', () => {
        let responseJSON = JSON.parse(request.responseText);
        if (responseJSON.error) return console.log(responseJSON.error);
        if (callback) callback(responseJSON);
    });

    request.addEventListener('error', (e) => {
        console.log("Error occurred");
        console.log(e);
    });

}*/
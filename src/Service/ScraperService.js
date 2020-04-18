const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const BASE_URL = "https://eksisozluk.com";
const HOT_TOPICS_URL = "https://eksisozluk.com/basliklar/gundem";

export function scrape(messageLimit, callback) {
    scrapeAllTopics(allTopics => {
        processList(allTopics, messageLimit)
    });
}

function scrapeAllTopics(callback) {
    requestPromise({
        url: HOT_TOPICS_URL,
        headers: {
            'User-Agent': 'Request-Promise',
        }
    })
        .then(function (response) {
            console.log("✔ Fetching page");
            callback(parseLeftFrame(response));
        })
        .catch(function (err) {
            console.log("X Error occurred in scraper");
            console.log(err);
        });
}

function processList(list, messageLimit) {
    list.sort((topic1, topic2) => JSON.parse(topic2).messageCount - JSON.parse(topic1).messageCount);

    list.forEach((topic) => {
        if (JSON.parse(topic).messageCount < messageLimit) {
            list.splice(list.indexOf(topic), 1);
        }
        console.log(JSON.parse(topic).messageCount)
    });

    console.log(list.length);
}

function parseLeftFrame(html) {
    console.log("✔ Parsing results");
    let $ = cheerio.load(html);
    let topicListHTML = $(".topic-list");
    let topicList = [];

    // get left frame HTML, and parse it topic by topic
    $('li', topicListHTML).each(function (index, row) {
        // message count
        let messageCount = $("small", $(this)).html();

        // clear message count from title
        if ($(this).find('small').length) {
            $(this).find('small').replaceWith();
        }

        let topic = JSON.stringify({
            title: $(this).text().trim(),
            messageCount: messageCount,
            link: BASE_URL + $('a', row).attr('href')
        });
        topicList.push(topic);
    });
    console.log("➡ Parsed " + topicList.length + " topics");

    return topicList;
}

// function parseCompanyCount(html) {
//     console.log("✔ Parsing results size");
//     let companyCount = $('.count', html)
//         .children()
//         .last()
//         .text();
//     console.log("➡ " + companyCount + " companies found");
//     totalCompanyCount = parseFloat(companyCount.replace(/,/g, ''));
// }

// function parseCompaniesOnPage(html, callback) {
//     // empInfo
//     console.log("✔ Parsing companies");
//     // companies is the parent HTML block where companies on the page are the children of.
//     let companies = $('.eiHdrModule', html);
//     console.log("➡ " + companies.length + " companies found on the page");
//     /*
//      * We need 5 attributes for each company in our application
//      * Company name, profile HOT_TOPICS_URL, picture HOT_TOPICS_URL, rate and total review count
//      * We'll extract each info through the iteration
//      */
//     for (let i = 0; i < companies.length; i++) {
//         console.log("✔ Parsing a company (" + (i + 1) + "/" + companies.length + ")");
//         let company = companies.get(i);
//         extractInfo(company);
//     }
//     console.log("✔ Page is parsed completely");
//     callback(companies.length);
// }

/*
 * The design of the website consists of 4 info blocks;
 * Logo block, Title block, Summary block, Review block.
 * Logo block and title block are contained together
 *
 * 1- Logo block includes company logo and company profile HOT_TOPICS_URL
 * 2- Title block includes company name, rating and company website
 * 3- Summary block includes total reviews, salaries and interviews
 * 4- Review block includes a review about the company
 *
 * We'll use the first 3 blocks for our app.
*/
// function extractInfo(company) {
//     // 2- Title block
//     let titleBlock = JSON.parse(scrapeTitleBlock(company));
//     console.log("titleBlock");
//     console.log(titleBlock);
// }
//
// // Title block includes company name, rating and company website
// // We'll extract name and rating
// function scrapeTitleBlock(company) {
//     let titleBlockHTML = $('.header', company);
//
//     // extract company name
//     let name = $('a', $('div', titleBlockHTML)).text();
//     // Remove unnecessary whitespace at the beginning
//     name = name.trim();
//
//     // company rating
//     let spanBlock = $('span', $('.hideDesk .ratingsSummary', titleBlockHTML));
//     let rate = $('.bigRating', spanBlock).text();
//     return (JSON.stringify({
//         name: name,
//         rate: rate
//     }))
// }
//
// function generateCompanyJSON(logoBlock, titleBlock, summaryBlock) {
//     let companyJSON = JSON.stringify({
//         name: titleBlock['name'],
//         rate: titleBlock['rate'],
//         profileURL: logoBlock['profileURL'],
//         pictureURL: logoBlock['pictureURL'],
//         totalReview: summaryBlock['totalReview']
//     });
//     topicList.push(companyJSON);
// }
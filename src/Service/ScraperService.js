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
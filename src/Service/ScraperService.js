const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const BASE_URL = "https://eksisozluk.com";

// Use Cloudflare Worker as a CORS Proxy to overcome CORS prevention
const HOT_TOPICS_URL = "https://crimson-fog-8f07.hakaneroztekin.workers.dev/";

export function scrape(messageLimit, callback) {
    scrapeAllTopics(allTopics => {
        callback(processList(allTopics, messageLimit));
    });
}

function scrapeAllTopics(callback) {
    requestPromise({
        url: HOT_TOPICS_URL,
        headers: {
            'User-Agent': 'Request-Promise',
            "Referer": "https://eksisozluk.com",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
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
    // remove possible duplicates
    let uniqueSet = new Set(list.map(e => JSON.stringify(e)));
    list = Array.from(uniqueSet).map(e => JSON.parse(e));

    // sort by entry count
    list.sort((topic1, topic2) => topic2.messageCount - topic1.messageCount);

    list = list.filter(function (topic) {
        return topic.messageCount > messageLimit
    });
    console.log(list);
    return list;
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

        // skip ad related topics
        if ($(this).find('.ad-banner').length) {
            return;
        }

        // Remove non-topic elements
        if (messageCount == null) {
            return;
        }

        // clear message count from title
        if ($(this).find('small').length) {
            $(this).find('small').replaceWith();
        }

        let topic = {
            title: $(this).text().trim(),
            messageCount: messageCount,
            link: BASE_URL + $('a', row).attr('href')
        };

        topicList.push(topic);
    });
    console.log("➡ Parsed " + topicList.length + " topics");

    return topicList;
}
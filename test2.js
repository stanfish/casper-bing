const keyA = new Array("2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "how+to", "when", "download", "how", "what", "internet", "time", "auto", "for+sale", "deal", "video", "korean", "chinese", "CA", "radio", "sticker", "MSN", "google", "bing", "iphone", "apple", "android", "Bill+Gate", "movie", "dramas", "tv", "definition", "map", "New+York", "book", "Amazon", "computer", "news", "2011", "2012", "2003", "MS", "cheap", "hotmail", "hello", "website", "diy", "day", "month", "MC", "Justin", "songs", "sleeping", "hiking", "place", "food", "tools", "name", "John", "happening", "NASA", "software", "accounting", "CEO", "company", "stock", "prices", "game", "windows", "mac", "honda", "BMW", "tel", "address", "how+much", "email", "weather", "doctor", "walmart", "lion", "sony", "work", "salary", "burger", "address", "we", "know", "jelly", "bean", "lol", "star", "music", "1998", "MSN", "messager", "gtalk", "hangout", "samsung", "x10", "nexus", "2013", "2014", "N4", "PS4", "wii", "year", "CA", "Irvine", "remote", "mobile", "one", "sc2", "pokemon", "hardware", "xbox", "iphone+case", "sticker", "apps", "Los+Angeles", "way", "cat", "toy", "peppa", "micky", "travel");

const fs = require('fs');
const logFile = 'myCasper.log';
const moment = require('moment');

var startLink = 'https://account.microsoft.com/account/ManageMyAccount';
var email = 'xxxxx';
var password = 'xxxxx';
var timePeriod = 8000;
var times = 2;

function writeToLog(msg) {
    console.log(msg);
    fs.write(logFile, '\n' + moment().subtract({ 'hours': 8 }).format() + ': ' + msg, 'a');
}

function getReward() {
    var box = document.querySelectorAll(".rewards-module .primary-text");
    return box;
}

var casper = require('casper').create({
    pageSettings: {
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10'
    },
    viewportSize: {
        width: 1024,
        height: 768
    },
});

writeToLog('-----------------------------------------');

casper.start(startLink, function goToLoginPage() {
    writeToLog('Click to login');
    this.click('#signinhero');
});

casper.then(function fillLoginDetails() {
    writeToLog('Fill in email');
    this.fill('form[name="f1"]', {
        'loginfmt': email
    }, false);
});

casper.then(function clickButton() {
    writeToLog('Submit');
    this.click('input[type="submit"]');
});

casper.waitForSelector("#displayName", function fillPassword() {
    writeToLog('Fill in password');
    this.fill('form[name="f1"]', {
        'passwd': password
    }, false);
});

casper.then(function clickButton() {
    writeToLog('Submit');
    this.click('input[type="submit"]');
});

casper.waitForSelector(".title-detail", function dashboard() {
    writeToLog('Logged in');
    var reward = this.evaluate(getReward);
    writeToLog("Current Point: " + reward[0].innerHTML);
});

var searchData = [];
var k = 0;

for (i = 1; i <= times; i++) {
    var searchS = '';
    for (j = 1; j <= (Math.floor(Math.random() * 8) + 2); j++) {
        searchS += keyA[Math.floor(Math.random() * keyA.length)] + '+';
    }

    var timeR = (Math.floor(Math.random() * 3) + 0.4) * timePeriod;
    var url = 'http://www.bing.com/search?q=' + searchS + '&go=&qs=n&form=QBRE&pq=' + searchS + '&sc=8-4&sp=-1&sk=';

    searchData.push({
        url: url,
        index: i,
        waitTime: timeR
    });

    casper.thenOpen(url, function () {
        writeToLog(searchData[k].index + ' search link: ' + searchData[k].url);
    });

    if (i != times) {
        casper.wait(timeR, function () {
            writeToLog('wait time: ' + searchData[k].waitTime);
            k++;
        });
    }
}

casper.run(function () {
    this.exit();
});




var startLink = 'https://account.microsoft.com/rewards/';
var timePeriod = 55000;
var times = 38;
const keyA = new Array("Cloud","AWS","raspberry","pi","Toyota","Honda","Kia","Benz","Lakers","Iphone+X","2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "how+to", "when", "download", "how", "what", "internet", "time", "auto", "for+sale", "deal", "video", "korean", "chinese", "CA", "radio", "sticker", "MSN", "google", "bing", "iphone", "apple", "android", "Bill+Gate", "movie", "dramas", "tv", "definition", "map", "New+York", "book", "Amazon", "computer", "news", "2011", "2012", "2003", "MS", "cheap", "hotmail", "hello", "website", "diy", "day", "month", "MC", "Justin", "songs", "sleeping", "hiking", "place", "food", "tools", "name", "John", "happening", "NASA", "software", "accounting", "CEO", "company", "stock", "prices", "game", "windows", "mac", "honda", "BMW", "tel", "address", "how+much", "email", "weather", "doctor", "walmart", "lion", "sony", "work", "salary", "burger", "address", "we", "know", "jelly", "bean", "lol", "star", "music", "1998", "MSN", "messager", "gtalk", "hangout", "samsung", "x10", "nexus", "2013", "2014", "N4", "PS4", "wii", "year", "CA", "Irvine", "remote", "mobile", "one", "sc2", "pokemon", "hardware", "xbox", "iphone+case", "sticker", "apps", "Los+Angeles", "way", "cat", "toy", "peppa", "micky", "travel");

const fs = require('fs');
const logFile = 'log/myCasper.log';
const moment = require('moment');


function writeToLog(msg) {
    console.log(msg);
    fs.write(logFile, '\n' + moment().format() + ': ' + msg, 'a');
}

function getReward() {
    var box = document.querySelectorAll("b.x-hidden-focus");
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


var configFile = casper.cli.args[0] ? casper.cli.args[0] : 'config.dev.json';
var config;
try {
    config = require(configFile);
} catch(e) {
    console.log('Error: Config file: '+configFile);
}
var email = config.email;
var password = config.password;

writeToLog('-----------------------------------------');

casper.start(startLink, function goToLoginPage() {

//    debugger;

    writeToLog('Click to login');
    this.click('#signinlinkhero');
});

casper.waitForSelector('form[name="f1"]', function fillLoginDetails() {
    writeToLog('Fill in email: ' + email);
    this.fill('form[name="f1"]', {
        'loginfmt': email
    }, false);
}, null,10000);

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

//.home-banner-profile-section
casper.waitForSelector("header.c-category-header", function dashboard() {
    writeToLog('Logged in');

    var timeR = (Math.floor(Math.random() * 3) + 0.4) * 100000;
    casper.wait(timeR, function () {
        writeToLog('wait a little... ');

        try {
            var imageTime = moment().subtract({ 'hours': 8 }).format();
            var imageName = "save" + imageTime.replace(/-|:/g, '') + ".png";
            this.captureSelector("images/"+imageName, 'div.title-detail span');
            writeToLog('*********** (' + configFile + ') Current Point: <img src="'+imageName+'"> ');
        }
        catch (error){
            writeToLog('error in getting points information',error);
        }

    });



    // var dlData = this.evaluate(function(){
    //     var dl = document.querySelectorAll('div.title-detail');
    //     return dl;
    //   });

     //  writeToLog('dlData',dlData);

//    var reward = this.evaluate(getReward);
//    console.log(reward);
//    console.log(reward.length);
//    console.log(JSON.stringify(reward));
//    if (reward[1]){
//	writeToLog("*********** Current Point: " + reward[1].innerHTML);
//    }
},null,50000);

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



casper.on('error', function(msg, trace) {
    writeToLog('ERROR', msg, trace);
});

var config = require('config.dev.json');
var email = config.email;
var password = config.password;
var startLink = 'https://account.microsoft.com/account/ManageMyAccount';

const fs = require('fs');
const logFile = 'log/myCasper.log';
const moment = require('moment');


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
    writeToLog('Fill in email: ' + email);
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
    writeToLog("*********** Current Point: " + reward[0].innerHTML);
});

casper.run(function () {
    this.exit();
});



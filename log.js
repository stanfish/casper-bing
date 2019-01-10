const express = require('express');
const app = express();
const fs = require('fs');
const logFile = 'log/myCasper.log';

app.get('/', (req, res) => {
  var text = fs.readFileSync(logFile,'utf8');
  var points = text.match(/current point:\s<.*>/gi);
  var link = '<a href="/full">Full Log</a><br />';
  if (points) {
    res.send(link+points.reverse().join('<br />'));
  }else {
    res.send(link);
  }

});

app.get('/full', (req, res) => {
  var text = fs.readFileSync(logFile,'utf8').toString().split("\n");
  if (text) {
    res.send(text.reverse().join('<br />'));
  }
});

var publicDir = require('path').join(__dirname,'/images');
app.use(express.static(publicDir));
app.listen(3000, () => console.log('Example app listening on port 3000!'))


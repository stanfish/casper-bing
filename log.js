const express = require('express');
const app = express();
const fs = require('fs');
const logFile = 'log/myCasper.log';

app.get('/', (req, res) => {
  var text = fs.readFileSync(logFile,'utf8');
  var points = text.match(/logged in\s[^\s]*\s[^\s]*\scurrent point:\s[^\s]*\s/gi);
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


app.listen(3000, () => console.log('Example app listening on port 3000!'))


// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
//{"unix":1600349606439,"utc":"Thu, 17 Sep 2020 13:33:26 GMT"}
app.get('/api/timestamp/', function (req, res) {
  var d = new Date();
  res.json({
    unix: d.getTime(),
    utc: d.toUTCString(),
  });
});

app.get('/api/timestamp/:date_string', function (req, res) {
  var d = new Date(req.params.date_string);
  console.log(req.params.date_string, d);
  if (d == 'Invalid Date') {
    var x = parseInt(req.params.date_string, 10);
    var val = new Date(x);
    console.log(x, val);
    if (val == 'Invalid Date') {
      res.json({
        error: 'Invalid Date',
      });
    } else {
      res.json({
        unix: val.getTime(),
        utc: val.toUTCString(),
      });
    }
  } else {
    res.json({
      unix: d.getTime(),
      utc: d.toUTCString(),
    });
  }
});

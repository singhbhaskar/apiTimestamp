// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// var datetime = require('node-datetime');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API dome text'});
});

app.get('/api/timestamp/:text?', function(req, res){
  console.log('GET REQUEST AT API/TIMESTAMP')
  var text = req.params.text
  var d;
  if(text == undefined){
    d = new Date()
  }
  else{
    if(text.search('-') >= 0)
      d = new Date(text)
    else{
      var temptext = parseInt(text)
      d = new Date(temptext)
    }
  }
  console.log('This text ' + text)
  var x = d.getTime()
  var u = d.toUTCString()
  
  var response = {unix: x, utc: u}
  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date_string", function(req, res){

  let date_string = req.params.date_string;
  let dateTransform = new Date(date_string);

  if(!isNaN(date_string)){
    dateTransform = new Date(parseInt(date_string));
    res.send(
      {
      unix: dateTransform.valueOf(),
      utc: dateTransform.toUTCString() }
      )
  }else if(dateTransform.getTime()){
    res.send(
      {
      unix:dateTransform.valueOf(),
      utc:dateTransform.toUTCString() }
      )
  }else{
    res.send({ error : "Invalid Date" });
  }
});

app.get("/api/", function(req, res){

  let dateTransform = new Date();

  res.send(
      {
      unix:dateTransform.valueOf(),
      utc:dateTransform.toUTCString() }
  );
  
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

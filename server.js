// Load the necessary servers.
var express = require('express');
var http = require( 'http' );
var nodemailer = require('nodemailer');
var path = require("path");

var app = express();
var bodyParser = require('body-parser');

var oneDay = 86400000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  // This needs replacing with the correct information
  smtpTrans = nodemailer.createTransport('smtps://XXX%40gmail.com:XXX@smtp.gmail.com');

  //Mail options
  mailOpts = {
      from: req.body.email, //grab form data from the request body object
      to: 'hightideaviation@gmail.com',
      subject: 'Helicopter Services Inquiry from hightideaviation web page',
      text: 'from:'+req.body.name + '\n\n'+ req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      console.log(error);
      if (error) {
        res.status(500).json({error:error});
      }
      //Yay!! Email sent
      else {
        res.sendStatus(200);
      }
  });
});
app.use(express.static(__dirname + '/app', { maxAge: oneDay }));
// For the bower components to be included with the index page
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/gallery',function(req,res){
     res.sendFile(path.join(__dirname + '/app/gallery.html'));
});

// For Google Dev tools and streamlining and anti-hacking stuff
app.get('/google30ac6a0ef76c4cbb',function(req,res){
     res.sendFile('app/google30ac6a0ef76c4cbb.html');
});

// For main page
app.listen(8080, function(){
  console.log('Server up and running at :'+ new Date);
});


// 404 Error
app.use(function(req, res, next) {
  // console.log(req);
  res.sendFile(path.join(__dirname + '/app/404.html'));
});


// app.use(app.router);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"


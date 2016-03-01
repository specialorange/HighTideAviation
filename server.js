// Load the necessary servers.
var express = require('express');
var http = require( "http" );
var nodemailer = require('nodemailer');

var app = express();

// For the main html index page
app.use(express.static(__dirname + '/app'));
// For the bower components to be included with the index page
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.listen(8080, function(){
  console.log('gh');
});

app.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "chrisfrisina@gmail.com",
          pass: "qwjzydavfwfitbrf" 
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'hightideaviation@specialorange.org',
      subject: 'HighTide Aviation web contact information',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { title: 'High Tide Aviation - Contact Form', msg: 'Error occurred, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'High Tide Aviation - Contact Form', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});
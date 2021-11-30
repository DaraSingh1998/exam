const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
var flash = require('connect-flash');


// Routes Being Set Here
const index = require('./routes/index');


var app = express();
const port = 5656|| process.env.PORT;

var genLog = (request, response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
}

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'ilovecarsandbikes',
  resave: false,
  saveUninitialized: true,
}));

//Flash message//
app.use(flash());

// Middleware to create log for the user
app.use(genLog);


// Middleware to check if the user is logged in
function ensureAuthenticated(request, response, next) {
  if(request.isAuthenticated()) {
    return next();
  }

  else{
    request.logout();
    response.redirect('/');
  }
}


app.use('/', index);


app.get('/logout', (request, response) => {
  request.logout();
  request.session.destroy();
  response.redirect('/');
});


app.listen(port, () => {
  console.log(`Port: ${port}`);
});

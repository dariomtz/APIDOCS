const functions = require('firebase-functions');
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path')
 
var app = express();
 
app.engine('.html', exphbs({extname: '.html'}));
//
app.set('view engine', '.html');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('welcome');
});

app.get('/signin', (req, res) => {
	res.render('auth', {title: 'Sign in'})
});

app.get('/signup', (req, res) => {
	res.render('auth', {title: 'Sign up'})
});

app.get('/:userId', (req, res) => {
	res.render('dynamic', {title: req.params['userId']})
});

app.get('/:userId/:projectId', (req, res) => {
	res.render('dynamic', {title: req.params['projectId']})
});

app.get('*', function(req, res){
  res.send('<h1>Sorry, 404 NOT FOUND</h1>', 404);
});

exports.app = functions.https.onRequest(app);
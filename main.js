console.log("hello")
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session')
const expressValidator = require('express-validator')
const app = express();
const doneArray = [];

app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');


app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(expressValidator());

app.use(session({
  secret: 'complete',
  resave: false,
  saveUninitialized: true
}))

app.use(morgan('dev'));

app.use((req, res, next) => {
  if (!req.session.bookList) {
    req.session.bookList = [];

  }

  console.log(req.session);
  next();

})

app.get('/', function(req, res) {
  if (req.session.bookList.length === 0) {
    res.render('home')

  } else {
    res.render('home', {
      todoLog: req.session.bookList

    });
   }
 });

 app.get('/', function(req, res) {
   res.render('home');
 });



 app.post('/enterTodo', function(req, res) {
   let todo = req.body;

   req.checkBody('todo').notEmpty();

   let items = req.validationErrors();

   if (items) {
     res.render('home', {

       taskField: todo

    });

 } else {

     req.session.bookList.push(todo);
     res.redirect('/');

   }

 })


 app.get('/del/:index', function(req, res) {
   req.session.bookList.splice(req.params.index, 1);
   res.redirect('/');
 })






 app.listen(3000, function() {
   console.log('App is running...');
 });

console.log("hello")
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session')
const expressValidator = require('express-validator')
const app = express();
let comp = [];


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
  if (!req.session.doneList) {
    req.session.doneList = []
  }
  if (!req.session.todoList) {
    req.session.todoList = [];

  }

  console.log(req.session);
  next();

})


app.get('/', function(req, res) {

    res.render('home', {
      todoLog: req.session.todoList,
      doneLog: req.session.doneList
    });
});



app.post('/enterTodo', function(req, res) {
   let todo = req.body.todo;
   console.log(todo)
   req.checkBody('todo').notEmpty();
   let items = req.validationErrors();
   if (items) {
     res.render('home', {


  });

 } else {

     req.session.todoList.push(todo);
     res.redirect('/');
   }

})


 app.get('/del/:index', function(req, res) {
  let done = req.session.todoList.splice(req.params.index, 1);
  req.session.doneList.push(done)
  console.log(comp)
  res.redirect('/');
 })


 app.listen(3000, function() {
   console.log('App is running...');
 });

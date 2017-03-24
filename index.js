var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var morgan = require('morgan');

var connectionString = "postgres://jizeball@localhost/ecommerce";

var app = module.exports = express();

app.use(morgan('dev'));
app.use(cors());
//call our controller
// var controller = require('./controller.js');

//Connect with Massive to our database
var massiveInstance = massive.connectSync({connectionString : connectionString});
app.set('db', massiveInstance);

var db = app.get('db');

app.use(bodyParser.json());


app.listen('8777', function(){
  console.log("Successfully listening on : 8777")
});

//Endpoints
app.get('/api/products', function(req, res) {
  db.read_products(function(err, products) {
    // res.send(Math.random().toString(36).substring(7));
    // res.send("I am a random string in GET api/products" + products);
    res.send(products);
  });
});

app.get('/api/products/:id', function(req, res) {
  db.read_product(req.params.id.slice(3), function(err, product) {
    // console.log(req.query.id);
    res.send("I will GET you a present at api/products. It is a " + req.params.id + " " + product[0].product);
    // console.log(req.params);
    // res.send(product[0]);
  })
});

app.post('/api/products', function(req, res) {
  // console.log([req.query.name, req.query.description, req.query.price, req.query.imgurl])
  db.create_product(req.body.product, req.body.price, req.body.description, function(err, product) {
    // console.log(req.query.id);
    if (err) {
      res.status(500).json(err);
      // console.log(req.body);
    } else {
      // res.send("it worked");
      // console.log(req.body);
      res.send(req.body.product + " added");
    }
  });
});


app.put('/api/products/:id', function(req, res){
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
  db.update_product(req.params.id.slice(3), req.body.product, function(err, product) {
    // console.log(req.query.id);
    if (err) {
      res.status(500).json(err);
      // console.log(req.body);
    } else {
      // res.send("it worked");
      // console.log(req.body);
      res.send(req.body.product + ": " + req.body.product + " updated");
    }
  });
});

app.delete('/api/products/:id', function(req, res){
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
  db.delete_product(req.params.id.slice(3), function(err, product) {
    // console.log(req.query.id);
    if (err) {
      res.status(500).json(err);
      // console.log(req.body);
    } else {
      // console.log(req.body);
      res.send("Product " + req.params.id.slice(3) + " deleted");
    }
  });
});

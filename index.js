var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var connectionString = "postgres://jizeball@localhost/ecommerce";

var app = module.exports = express();



app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());


//Connect with Massive to our database
var massiveInstance = massive.connectSync({connectionString : connectionString});
app.set('db', massiveInstance);

var db = app.get('db');

app.use(bodyParser.json());

app.listen('8777', function(){
  console.log("Successfully listening on : 8777")
});

app.use(express.static('./'));

//Endpoints Products
app.get('/api/products', function(req, res) {
  db.read_products(function(err, products) {
    res.send(products);
  });
});

app.get('/api/products/:id', function(req, res) {
  db.read_product(req.params.id.slice(3), function(err, product) {
    res.send("I will GET you a present at api/products. It is a " + req.params.id + " " + product[0].product);
  })
});

app.post('/api/products', function(req, res) {
  db.create_product(req.body.product, req.body.price, req.body.description, req.body.imgurl, function(err, product) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(req.body.product + " added");
    }
  });
});

app.put('/api/products/:id', function(req, res){
  console.log(req.params.id.slice(3));
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
  db.update_product(req.params.id.slice(3), req.body.product, req.body.price, req.body.description, req.body.imgurl, function(err, product) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(req.body.product + ": " + req.body.product + " updated");
    }
  });
});

app.delete('/api/products/:id', function(req, res){
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
  db.delete_product(req.params.id.slice(3), function(err, product) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send("Product " + req.params.id.slice(3) + " deleted");
    }
  });
});

//Endpoints users
app.get('/api/users', function(req, res) {
  db.read_users(function(err, users) {
    res.send(users);
  });
});

app.get('/api/users/:id', function(req, res) {
  db.read_user(req.params.id.slice(3), function(err, user) {
    res.json(user);
  })
});

//Endpoints cart
app.post('/api/cart', function(req, res) {
  console.log("data", req.body.user, req.body.product, req.body.quantity);
  db.add_to_cart(req.body.user, req.body.product, req.body.quantity, function(err, product) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send("added");
    }
  });
});

app.get('/api/cart', function(req, res) {
  var id = JSON.parse(req.cookies.loggedInUser).id*1;
  db.read_cart(id, function(err, products) {
    res.send(products);
  });
});

app.delete('/api/cart/:id', function(req, res){
	if(!req.params.id){
		return res.status(400).send('id query needed');
	}
  db.delete_cart_product(req.params.id.slice(3), function(err, product) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send("Product " + req.params.id.slice(3) + " deleted");
    }
  });
});


//Facebook Authentication
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(session({secret: '5f0b7fa7adb96b52ee11fdd9cb08cc3d'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies;
    if (req.user) {
      res.cookie('loggedInUser', JSON.stringify(req.user._json));
    }
  next(); // <-- important!
});


passport.use(new FacebookStrategy({
  clientID: '196207837544896',
  clientSecret: '5f0b7fa7adb96b52ee11fdd9cb08cc3d',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  scope: ['public_profile', 'email', 'user_friends', 'user_birthday'],
  profileFields: ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender']
}, function(token, refreshToken, profile, done) {
  var user = profile._json;
  db.users.find(profile.id*1, function(err, data){
    if (data) {
      console.log('exist', data);
      return done(null, profile);
    } else {
      db.users.insert({id: user.id*1, first_name: user.first_name, last_name: user.last_name, email: user.email}, function(err, newUser){
        var profile = newUser[0];
        return done(null, profile);
      });
    }
  });
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',{
  successRedirect: 'http://localhost:8777/#/',
  failureRedirect: '/auth/facebook'
}), function(req, res) {
  console.log('session', req.session);
});

//logout
app.get('/logout', function(req, res) {
    req.logout();
    res.clearCookie("loggedInUser");
    res.redirect('/#/');
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res) {
  var user = req.user._json;
  localStorage.user = user;
  console.log(ocalStorage.user);
});


app.listen(3000, function() {
})

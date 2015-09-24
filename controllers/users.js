var db = require('../models/index');

app.get('/login', routeHelpers.preventLoginSignup, function(req, res){
  res.render('users/login');
});

app.post('/login', function(req, res){
  db.User.authenticate(req.body.user, function(err, user){
    if (!err && user !== null) {
      req.login(user);
      res.redirect('/recipe_books');
    } else {
      console.log(err);
      res.render('users/login', {user: user});
    }
  });
});

app.get('/signup', routeHelpers.preventLoginSignup, function(req, res){
  res.render('users/signup');
});

app.post('/signup', function(req, res){
  var newUser = req.body.user;
  db.User.create(newUser, function(err, user){
    if (user) {
      req.login(user);
      res.redirect('/recipe_books');
    } else {
      console.log(err);
      res.render('users/signup');
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

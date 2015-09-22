app.get('/', function(req, res){
  res.render('index');
});

require('./f2fRecipes');
require('./recipeBooks');
require('./userRecipes');
require('./users');

app.get('logout', function(req, res){
  // logout
});

// catch-all route
app.get('*', function(req, res){
  // render 404
});

app.get('/', routeHelpers.preventLoginSignup,function(req, res){
  res.render('index');
});

require('./f2fRecipes');
require('./recipeBooks');
require('./userRecipes');
require('./users');


// catch-all route
app.get('*', function(req, res){
  // render 404
});

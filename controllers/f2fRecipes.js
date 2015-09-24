var db = require('../models/index');
var request = require('request');

// RecipeBook's F2fRecipe's INDEX
app.get('/recipe_books/:recipe_book_id/f2f_recipes', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.RecipeBook.findById(req.params.recipe_book_id)
    .populate('f2fRecipes')
    .exec(function(err, book){
      res.render('f2fRecipes/index', {recipeBook: book});
    });
});


// NEW F2fRecipe Form
app.get('/recipe_books/:recipe_book_id/f2f_recipes/new', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  var recipeId = req.query.recipeId;
  request.get('http://food2fork.com/api/get?rId=' + recipeId + '&key=aa8f5bbc95c65103384ed6b44c18b0a0',
    function(err, response, body){
      if (err) {
        console.log(err);
      } else if (!err && response.statusCode === 200) {
        var recipeData = JSON.parse(body);
        var recipe = recipeData.recipe;
        res.render('f2fRecipes/new', {recipe: recipe, bookId: req.params.recipe_book_id});
      }
    });
});

app.get('/search_results', routeHelpers.ensureLoggedIn,function(req, res){
  var bookId = req.query.recipeBook;
  var searchTerm = req.query.search;
  db.RecipeBook.findById(bookId, function(err, book){
    if (err) {
      console.log(err);
    } else {
      request.get('http://food2fork.com/api/search?q=' + searchTerm + '&key=aa8f5bbc95c65103384ed6b44c18b0a0',
        function(err, response, body){
          if (err) {
            console.log("Error! Request Failed - " + err);
          } else if (!err && response.statusCode === 200) {
            var recipeData = JSON.parse(body);
            var recipes = recipeData.recipes;
            res.render('f2fRecipes/recipe-search-results', {book: book, recipes: recipes, label: "Recipes with " + searchTerm + "in them"});
          }
        });
    }
  });
});

// CREATE  a new F2fRecipe for a specific book
app.post('/recipe_books/:recipe_book_id/f2f_recipes', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.F2fRecipe.create(req.body, function(err, recipe){
    if (err) {
      console.log(err);
      res.render('f2frecipes/new', {recipe: recipe});
    } else {
      db.RecipeBook.findById(req.params.recipe_book_id, function(err, book){
        book.f2fRecipes.push(recipe);
        recipe.book = book._id;
        recipe.save();
        book.save();
        res.redirect('/recipe_books/' + req.params.recipe_book_id + '/f2f_recipes');
      });
    }
  });
});

// SHOW a f2fRecipe
app.get('/recipe_books/:recipe_book_id/f2f_recipes/:id', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.F2fRecipe.findById(req.params.id)
    .populate('book')
    .exec(function(err, recipe){
      res.render('f2fRecipes/show', {recipe: recipe});
    });
});

// DO I NEED THIS EDIT ROUTE???
// EDIT form for a F2fRecipe in a RecipeBook
// app.get('/recipe_books/:recipe_book_id/f2f_recipes/:id/edit', function(req, res){
//   db.F2fRecipe.findById(req.params.id)
//     .populate('book')
//     .exec(function(err, recipe){
//       if (err) {
//         console.log(err);
//       } else {
//         res.render('f2fRecipes/edit', {recipe: recipe});
//       }
//     });
// });

// REMOVE a F2fRecipe from a RecipeBook
app.delete('/recipe_books/:recipe_book_id/f2f_recipes/:id', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.F2fRecipe.findByIdAndRemove(req.params.id, req.body, function(err, recipe){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/recipe_books/' + req.params.recipe_book_id + '/f2f_recipes');
    }
  });
});

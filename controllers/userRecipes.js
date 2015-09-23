var db = require('../models/index');

// RecipeBook's UserRecipe's index
app.get('/recipe_books/:recipe_book_id/user_recipes', function(req, res){
  db.RecipeBook.findById(req.params.recipe_book_id).populate('userRecipes').exec(function(err, book){
    res.render('recipes/index', {book: book});
  });
});

// NEW UserRecipe Form
app.get('/recipe_books/:recipe_book_id/user_recipes/new', function(req, res){
  db.RecipeBook.findById(req.params.recipe_book_id, function(err, book){
    res.render('recipes/new', {book: book});
  });
});

// CREATE a new UserRecipe for specific RecipeBook
app.post('/recipe_books/:recipe_book_id/user_recipes', function(req, res){
  db.UserRecipe.create(req.body, function(err, recipe){
    console.log(recipe);
    if (err) {
      console.log(err);
      res.render('recipes/new');
    } else {
      db.RecipeBook.findById(req.params.recipe_book_id, function(err, book){
        book.userRecipes.push(recipe);
        recipe.book = book._id;
        recipe.save();
        book.save();
        res.redirect('/recipe_books' + req.params.recipe_book_id + '/user_recipes');
      });
    }
  });
});

// SHOW A UserRecipe
app.get('recipe_books/:recipe_book_id/user_recipes/:id', function(req, res){
  db.userRecipe.findById(req.params.id)
    .populate('book')
    .exec(function(err, recipe){
      console.log(recipe.book);
      res.render('recipes/show');
    });
});

app.get('/recipe_books/:recipe_book_id/user_recipes/:id/edit', function(req, res){
  db.UserRecipe.findById(req.params.id)
    .populate('book')
    .exec(function(err, recipe){
      if (err) {
         console.log(err);
      } else {
        res.render('recipes/edit', {recipe: recipe});
      }
    });
});

// UPDATE a UserRecipe
app.put('/recipe_books/:recipe_book_id/user_recipes/:id', function(req, res){
  db.UserRecipe.findByIdAndUpdate(req.params.id, req.body, function(err, recipe){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/recipe_books/' + req.params.recipe_book_id + '/user_recipes');
    }
  });
});

// REMOVE a UserRecipe from recipeBook
app.delete('recipe_books/:recipe_book_id/recipes/:id', function(req, res){
  db.UserRecipe.findByIdAndRemove(req.params.id, req.body, function(err, recipe){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/recipe_books/' + req.params.recipe_book_id +  '/recipes');
    }
  });
});

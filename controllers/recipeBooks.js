var db = require('../models/index');

// INDEX
app.get('/recipe_books', routeHelpers.ensureLoggedIn, function(req, res){
  db.RecipeBook.find({owner: req.session.id})
    .populate('f2fRecipes')
    .populate('userRecipes')
    .populate('owner')
    .exec(function(err, books){
      res.render('recipeBooks/index', {books: books || ["NO BOOKS"]});
    });
});

// SEND NEW FORM
app.get('/recipe_books/new', routeHelpers.ensureLoggedIn, function(req, res){
  res.render('recipeBooks/new');
});

// CREATE NEW RECIPE BOOK
app.post('/recipe_books', routeHelpers.ensureLoggedIn,function(req, res){
  var newRecipeBook = req.body;
  db.User.findById(req.session.id, function(err, user){
    db.RecipeBook.create(newRecipeBook, function(err, book){
      user.recipeBooks.push(book);
      book.owner = req.session.id;
      book.save();
      user.save();
      res.redirect('/recipe_books');
    });
  });
});

// SHOW A RECIPE BOOK
app.get('/recipe_books/:recipe_book_id', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.RecipeBook.findById(req.params.recipe_book_id)
    .populate('f2fRecipes')
    .populate('userRecipes')
    .exec(function(err, book){
      res.render('recipeBooks/show', {book: book});
    });
  // db.RecipeBook.findById(req.params.recipe_book_id, function(err, book){
  //   res.render('recipeBooks/show', {book: book});
  // });
});

// GET EDIT FORM FOR A RECIPE BOOK
app.get('/recipe_books/:recipe_book_id/edit', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.RecipeBook.findById(req.params.recipe_book_id, function(err, book){
    if (err) {
      console.log(err);
    } else {
      res.render('recipeBooks/edit', {book: book});
    }
  });
});

// UPDATE A RECIPE BOOK
app.put('/recipe_books/:recipe_book_id', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  var updatedContent = req.body;
  db.RecipeBook.findByIdAndUpdate(req.params.recipe_book_id, updatedContent,
    function(err, book){
      if (err) {
        console.log(err);
        res.render('recipeBooks/edit', {book: book});
      } else {
        res.redirect('/recipe_books');
      }
    });
});

// DELETE A RECIPE BOOK
app.delete('/recipe_books/:recipe_book_id', routeHelpers.ensureLoggedIn, routeHelpers.ensureCorrectUser,function(req, res){
  db.RecipeBook.findByIdAndRemove(req.params.recipe_book_id, function(err, book){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/recipe_books');
    }
  });
});

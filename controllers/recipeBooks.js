var db = require('../models/index');

// INDEX
app.get('/recipe_books', function(req, res){
  db.RecipeBook.find({}, function(err, books){
    res.render('recipeBooks/index', {books: books});
  });
});

// SEND NEW FORM
app.get('/recipe_books/new', function(req, res){
  res.render('recipe_books/new');
});

// CREATE NEW RECIPE BOOK
app.post('/recipe_books', function(req, res){
  var recipeBook = req.body;
  db.RecipeBook.create(recipeBook, function(err, book){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/recipe_books');
    }
  });
});

// SHOW A RECIPE BOOK
app.get('/recipe_books/:id', function(req, res){
  db.RecipeBook.findById(req.params.id, function(err, book){
    res.render('recipeBooks/show', {book: book});
  });
});

// GET EDIT FORM FOR A RECIPE BOOK
app.get('/recipe_books/:id/edit', function(req, res){
  db.RecipeBook.findById(req.params.id, function(err, book){
    if (err) {
      console.log(err);
    } else {
      res.render('recipeBooks/edit', {book: book});
    }
  });
});

// UPDATE A RECIPE BOOK
app.put('/recipe_books/:id', function(req, res){
  var updatedContent = req.body;
  db.RecipeBook.findByIdAndUpdate(req.params.id, updatedContent,
    function(err, book){
      if (err) {
        console.log(err);
        res.render('recipeBooks/edit', {book: book});
      } else {
        res.redirect('/recipe_books/' + book.id);
      }
    });
});

// DELETE A RECIPE BOOK
app.delete('/recipe_books/:id', function(req, res){
  db.RecipeBook.findByIdAndRemove(req.params.id, function(err, book){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/recipe_books');
    }
  });
});

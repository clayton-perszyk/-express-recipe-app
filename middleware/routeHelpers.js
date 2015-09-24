var db = require('../models');
var routeHelpers = {
  ensureLoggedIn: function(req, res, next){
    if (req.session.id !== null && req.session.id !== undefined) {
      return next();
    } else {
      res.redirect('/login');
    }
  },

  ensureCorrectUser: function(req, res, next){
    db.RecipeBook.findById(req.params.recipe_book_id, function(err, book){
      if (book.owner.toString() !== req.session.id) {
        res.redirect('/');
      } else {
        return next();
      }
    });
  },
  preventLoginSignup: function(req, res, next){
    if (req.session.id !== null && req.session.id !== undefined) {
      res.redirect('/recipe_books');
    } else {
      return next();
    }
  }
};

module.exports = routeHelpers;

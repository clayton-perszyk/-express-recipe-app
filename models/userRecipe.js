var mongoose = require('mongoose');

var userRecipeSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  ingredients: String,
  directions: String,
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecipeBook"
  }
});

var UserRecipe = mongoose.model("UserRecipe", userRecipeSchema);

module.exports = UserRecipe;

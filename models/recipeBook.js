var mongoose = require('mongoose');

var recipeBookSchema = new mongoose.Schema({
  title: String,
  dateCreated: Date,
  userRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRecipe"
  }],
  f2fRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "F2fRecipe"
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

var RecipeBook = mongoose.model("RecipeBook", recipeBookSchema);

module.exports = RecipeBook;

var mongoose = require('mongoose');

var f2fRecipeSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  source: String,
  socialRating: String,
  publisher: String,
  dateAdded: Date,
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecipeBook"
  }
});

var F2fRecipe = mongoose.model("F2fRecipe", f2fRecipeSchema);

module.exports = F2fRecipe;

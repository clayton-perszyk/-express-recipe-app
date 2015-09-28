var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/express_recipe_app');

module.exports.F2fRecipe = require('./f2fRecipe');
module.exports.RecipeBook = require('./recipeBook');
module.exports.User = require('./user');
module.exports.UserRecipe = require('./userRecipe');

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  recipeBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipeBook"
  }]
});

var User = mongoose.model("User", userSchema);

module.exports = User;

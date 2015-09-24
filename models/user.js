var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  recipeBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipeBook"
  }]
});

// password encryption hook
userSchema.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

userSchema.pre('remove', function(next){
  RecipeBook.remove({owner: this._id}).exec();
  next();
});

userSchema.statics.authenticate = function(formData, callback){
  this.findOne({
    email: formData.email
  },
  function(err, user){
    if (user === null) {
      callback("Invalid username or password", null);
    } else {
      user.checkpassword(formData.password, callback);
    }
  });
};

userSchema.methods.checkpassword = function(password, callback){
  var user = this;
  bcrypt.compare(password, user.password, function(err, isMatch){
    if (isMatch) {
      callback(null, user);
    } else {
      callback(err, user);
    }
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;

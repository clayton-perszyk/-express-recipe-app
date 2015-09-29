var db = require('../models');
var viewHelpers = {
  capitalize: function(string){
    var stringSplit = string.split(" ");
    var returnString = "";
    stringSplit.forEach(function(word){
      returnString += word.charAt(0).toUpperCase() + word.slice(1, word.length);
      returnString += " ";
    });
    return returnString.trim();
  },

  pluralize: function(word, number){
    return parseInt(number) === 1 ? word : (word + "s");
  }
};

module.exports = viewHelpers;

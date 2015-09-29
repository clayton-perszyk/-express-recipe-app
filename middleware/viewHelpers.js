var db = require('../models');
var viewHelpers = {
  capitalize: function(string){
    return string.charAt(0).toUpperCase() + string.slice(1, string.lenght);
  },

  pluralize: function(word, number){
    return parseInt(number) === 1 ? word : (word + "s");
  }
};

module.exports = viewHelpers;

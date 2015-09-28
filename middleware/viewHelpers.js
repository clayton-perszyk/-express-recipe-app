var db = require('../models');
var viewHelpers = {
  capitalize: function(string){
    return string.charAt(0).toUpperCase() + string.slice(1, string.lenght);
  }
};

module.exports = viewHelpers;

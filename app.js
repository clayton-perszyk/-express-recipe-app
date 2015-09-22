var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var db = require('./models');
var loginMiddleware = require('./middleware/loginHelpers');
var routeMiddleware = require('./middleware/routeHelpers');

app = express();

app.set('view engine', 'ejs');
app.use(loginMiddleware);
app.use(routeMiddleware);
app.use(express.static(__dirname + '/public'));
app.use(badyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
// app.use(session({
//   maxAge: 3600000,
//   secret: 'youllnevergethis',
//   name: 'user-session'
// }));
// app.use(function(req, res, next){
//   res.locals.userSession = req.session.id;
//   next();
// });

require('./controllers/index');

app.listen(3000, function(){
  console.log('server is listening on port 3000');
});
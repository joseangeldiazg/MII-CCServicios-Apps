var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');


app.get('/user/new', function(request, response) {

  response.render('new');

  });

app.get('/', function(request, response) {

    response.render('new');

    });

app.post('/user', function(request, response) {

    var u = request.body;

    // podemos acceder a DB sin hacer
    // require porque es global
    var newUser = new db.user({
      name: u.name
    });

    newUser.save(function(error, newUser) {

      if (error) response.json(error);

      response.redirect('/user');

    });

  });

  app.get('/user', function(request, response) {

    db
    .user
    .find()
    .exec(function (error, users) {

      if (error) return res.json(error);

      return response.render('index', {
        users: users
      });

    });

  });

  app.get('/user/edit/:id', function(request, response) {

  var userId = request.params.id;

  db
  .user
  .findById(userId, function (error, user) {

    if (error) return response.json(error);

    response.render('edit', user);

  });

});

app.put('/user/:id', function(request, response) {

  var user = request.body,
      userId = request.params.id;

  delete user.id;
  delete user._id;

  db
  .user
  .findByIdAndUpdate(userId, user, function (error, users) {

    if (error) return response.json(error);

    response.redirect('/user');

  });

});

app.get('/user/delete/:id', function(request, response) {

  var userId = request.params.id;

  db
  .user
  .findByIdAndRemove(userId, function (error, users) {

    if (error) return response.json(error);

    response.redirect('/user');

  });

});

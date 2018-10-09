var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var busqueda = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Laboratorio Mongo' });
});

router.get('/todasPeli', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log("Connection established");

      var collection = db.collection('peliculas');

      collection.find({}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render('todasPeli', {
            todasPeli : result
          });
        } else {
          res.send('No documents found');
        }

        db.close();
      });
    }
  });
});

router.get('/buscarPeli', function(req, res){
  res.render('buscarPeli', {title: 'Buscar pelicula por nombre'});
});

router.get('/resPeli', function(req, res){
  res.render('resPeli', {peli: busqueda});
});

router.post('/mostrarPeli', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('peliculas');

      var peliculasS = req.body.nombrep;

      collection.find({nombre:peliculasS}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else {
          busqueda = result;
          res.redirect("resPeli");
        }

        db.close();
      });
    }
  });
});

router.get('/buscarFran', function(req, res){
  res.render('buscarFran', {title: 'Buscar pelicula por franquicia'});
});

router.get('/resFran', function(req, res){
  res.render('resFran', {peli: busqueda});
});

router.post('/mostrarFran', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('peliculas');

      var peliculasS = req.body.nombrep;

      collection.find({franquicia:peliculasS}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else {
          busqueda = result;
          res.redirect("resFran");
        }

        db.close();
      });
    }
  });
});

router.get('/buscarDia', function(req, res){
  res.render('buscarDia', {title: 'Buscar pelicula por franquicia'});
});

router.get('/resDia', function(req, res){
  res.render('resDia', {peli: busqueda});
});

router.post('/mostrarDia', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('peliculas');

      var year1 = parseInt(req.body.value1, 10);
      var year2 = parseInt(req.body.value2, 10);
      var peliculasS = { $gte: year1, $lte: year2 };

      collection.find({year: peliculasS}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else {
          busqueda = result;
          res.redirect("resDia");
        }

        db.close();
      });
    }
  });
});






router.post('/addstudent', function(req, res){
  var MongoClient = mongodb.MongoClient;
  

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('students');

      var student1 = {student: req.body.student, street: req.body.street, city: req.body.city, state: req.body.state, sex: req.body.sex, gpa: req.body.gpa};

      collection.insert([student1], function(err, result){
        if(err){
          console.log(err);
        } else{
          res.redirect("thelist");
        }
        db.close();
      });
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var busqueda = {};
var duracionProd = 0;

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

router.get('/todasProd', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log("Connection established");

      var collection = db.collection('productoras');

      collection.find({}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else if (result.length){
          res.render('todasProd', {
            todasProd : result
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
  res.render('buscarDia', {title: 'Buscar pelicula por año'});
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


router.get('/buscarProd', function(req, res){
  res.render('buscarProd', {title: 'Buscar pelicula por producdora'});
});

router.get('/resProd', function(req, res){
  res.render('resProd', {peli: busqueda, durc: duracionProd});
});

router.post('/mostrarProd', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('peliculas');

      var peliculasS = req.body.nombrep;

      collection.find({productor:peliculasS}).toArray(function(err, result){
        if (err){
          res.send(err);
        } else {
          busqueda = result;
          var tiempo = 0;
          var x;
          for (x in result){
            tiempo += parseInt(result[x].duracion, 10);
          }
          duracionProd = tiempo/(result.length);

          res.redirect("resProd");
        }

        db.close();
      });
    }
  });
});

router.get('/dataPeli', function(req, res){
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/LabMongo';

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log("Connection established");

      var collection = db.collection('peliculas');

      var conteoFin = 0;
      var menorFin = {};
      var maxFin = {};

      collection.count({}, function(err, conteo){
        if (err){
          res.send(err);
        } else {
          conteoFin = conteo;
          collection.find({}).sort({duracion: 1}).limit(1).toArray(function(err, menor){

            if (err){
              res.send(err);
            } else {
    
                menorFin = menor[0];
                collection.find({}).sort({duracion: -1}).limit(1).toArray(function(err, maximo){

                  if (err){
                    res.send(err);
                  } else {
          
                      maxFin = maximo[0];
                  } 
                  res.render('dataPeli', {contPeli : conteoFin, menorPeli : menorFin, maxPeli : maxFin});
                  db.close();
                  
                });
            } 
            
          });
        }

      });

     

      
      
    }
  });
});

router.get('/newPeli', function(req, res){
  res.render('newPeli', {title: 'Agregar una nueva película'});
});

router.post('/addPeli', function(req, res){
  var MongoClient = mongodb.MongoClient;
  

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('peliculas');

      var peli1 = {nombre: req.body.nombre, genero: req.body.genero, director: req.body.director, franquicia: req.body.franquicia, pais: req.body.pais, year: req.body.year, duracion: req.body.duracion, productor: req.body.productos, actores: req.body.actores};

      collection.insert([peli1], function(err, result){
        if(err){
          console.log(err);
        } else{
          res.redirect("/");
        }
        db.close();
      });
    }
  });
});

router.get('/newProd', function(req, res){
  res.render('newProd', {title: 'Agregar una nueva productora'});
});

router.post('/addProd', function(req, res){
  var MongoClient = mongodb.MongoClient;
  

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('productoras');

      var prod1 = {nombre: req.body.nombre, year: req.body.year, web: req.body.web};

      collection.insert([prod1], function(err, result){
        if(err){
          console.log(err);
        } else{
          res.redirect("/");
        }
        db.close();
      });
    }
  });
});

router.get('/deletePeli', function(req, res){
  res.render('deletePeli', {title: 'Remover película'});
});

router.post('/remPeli', function(req, res){
  var MongoClient = mongodb.MongoClient;
  

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('peliculas');

      var peli1 = {nombre: req.body.nombre}

      collection.remove(peli1, function(err, result){
        if(err){
          console.log(err);
        } else{
          res.redirect("/");
        }
        db.close();
      });
    }
  });
});

router.get('/deleteProd', function(req, res){
  res.render('deleteProd', {title: 'Remover productora'});
});

router.post('/remProd', function(req, res){
  var MongoClient = mongodb.MongoClient;
  

  var url = 'mongodb://localhost:27017/LabMongo';
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log('Unable to connect to server', err);
    } else {
      console.log('Connectes to server');

      var collection = db.collection('productoras');

      var peli1 = {nombre: req.body.nombre}

      collection.remove(peli1, function(err, result){
        if(err){
          console.log(err);
        } else{
          res.redirect("/");
        }
        db.close();
      });
    }
  });
});

module.exports = router;

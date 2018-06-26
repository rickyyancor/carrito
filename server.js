var port = process.env.PORT || 80;
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var server = app.listen(port);
var io = require('socket.io').listen(server);
//Rutas
app.use('/', express.static(__dirname + '/html/'));

// POST method route
app.post('/', function (req, res) {
  var jsondata={a:90,b:29,c:"hola c"}
  console.log("se ha hecho una solicitud post con un parametro de valor:  "+req.body.parametro1);
  res.json(jsondata);
});

app.get("/", function (req, res) {
  console.log("se ha realizado un metodo get con parametro : "+req.query.parametro1);
      res.sendFile(__dirname + '/html/index.html');
});


var Gpio = require('onoff').Gpio;
var adelante = new Gpio(26, 'out');
var atras = new Gpio(19, 'out');
var derecha = new Gpio(13, 'out');
var izquierda = new Gpio(6, 'out');

io.on('connection', function (socket) {
  socket.on('detener',function(time) {
  	adelante.writeSync(0);
    atras.writeSync(0);
    derecha.writeSync(0);
    izquierda.writeSync(0);
    console.log("detener"+time)
  });
  socket.on('adelante',function(time) {
  	adelante.writeSync(1);
    setTimeout(function () {
      adelante.writeSync(0);
    }, parseInt(time));
    console.log("adelante "+time)
  });
  socket.on('atras',function(time) {
  	atras.writeSync(1);
    setTimeout(function () {
      atras.writeSync(0);
    }, parseInt(time));
    console.log("atras "+time)
  });
  socket.on('derecha_adelante',function(time) {
  	adelante.writeSync(1);
    derecha.writeSync(1);
    setTimeout(function () {
      adelante.writeSync(0);
      derecha.writeSync(0);
    }, parseInt(time));
    console.log("de adelante "+time)
  });
  socket.on('derecha_atras',function(time) {
    derecha.writeSync(1);
    atras.writeSync(1);
    setTimeout(function () {
      atras.writeSync(0);
      derecha.writeSync(0);
    }, parseInt(time));
    console.log("de atras "+time)
  });
  socket.on('izquierda_adelante',function(time) {
    adelante.writeSync(1);
    izquierda.writeSync(1);
    setTimeout(function () {
      adelante.writeSync(0);
      izquierda.writeSync(0);
    }, parseInt(time));
    console.log("iz adelante "+time)
  });
  socket.on('izquierda_atras',function(time) {
    izquierda.writeSync(1);
    atras.writeSync(1);
    setTimeout(function () {
      atras.writeSync(0);
      izquierda.writeSync(0);
    }, parseInt(time));
    console.log("iz atras "+time)
  });
  socket.on('servo',function(posicion) {
	var Gpio = require('pigpio').Gpio;
  var motor = new Gpio(21, {mode: Gpio.OUTPUT});
  posicion=posicion*(1750/180)+550;
  if(!(posicion<550 || posicion >2300))
  {

    console.log("servo"+posicion);
    motor.servoWrite(parseInt(posicion));
  }
});

});

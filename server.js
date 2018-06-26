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



//comunicacion con socket
io.on('connection', function (socket) {
  socket.on('prueba',function(mensaje) {
	var Gpio = require('onoff').Gpio; 
	var LED = new Gpio(26, 'out');console.log(mensaje);
	LED.writeSync(parseInt(mensaje));
});
  socket.on('pruebaaa',function(mensaje) {
	var Gpio = require('pigpio').Gpio,
  motor = new Gpio(21, {mode: Gpio.OUTPUT}),
  pulseWidth = 1000,
  increment = 100;

setInterval(function () {
  motor.servoWrite(pulseWidth);

  pulseWidth += increment;
  if (pulseWidth >= 2000) {
    increment = -100;
  } else if (pulseWidth <= 1000) {
    increment = 100;
  }
}, 1000);

    console.log(mensaje);
});
});

$(document).ready(function() {
  var socket = io();
  $("#btn").click(function() {
    console.log("Consola del cliente click al boton");
    socket.emit('prueba',$("#mensaje").val());
  });

});

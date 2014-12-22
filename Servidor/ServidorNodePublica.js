/**
 * Created by Jose Mansilla on 10/12/14.
 */

//// Creo las facturas.
var listaFacturas = [];

var factura1 = {"id": 1, "concepto": "MAC", "importe":10000};
var factura2 = {"id": 2, "concepto": "Tablet", "importe": 500};
var factura3 = {"id": 3, "concepto": "phone", "importe": 1000};

listaFacturas.push(factura1);
listaFacturas.push(factura2);
listaFacturas.push(factura3);

//Cargamos express.
var express = require("express");
var app = express();

//URL Facturas.
app.get("/ArquitecturaWebAngular/facturas", function(req, res){
    res.send(listaFacturas);
});

app.use("/", express.static(_dirname+"/ArquitecturaWebAngular", 'public'));

//Iniciamos el servidor.

var servidor = app.listen(3000, function(){
    console.log("Servidor NODE.js arrancado en puerto 3000");
});

/**
 * Created by Jose Mansilla on 8/12/14.
 */
function Factura(json){
    this.id = json.id;
    this.concepto = json.concepto;
    this.importe = json.importe;

    this.calcularIVA = function(){
        return this.importe * 1.21;
    }
};

var app = angular.module('myApp', []);

/*
app.controller('controladorFacturas', function($scope){
    $scope.factura = {"id": 1, "concepto": "MAC","importe": 10000};
});
*/

/*
 Creamos un servicio para organizar las peticiones al servidor.
 */
app.service('ServicioFacturas', function($http){
    this.listarFacturas = function(){
        return $http.get("http://localhost:3000/facturas");
    };

    this.addFactura = function(factura){
        return $http.post("http://localhost:3000/facturas", JSON.stringify( factura ));
    };

    this.removerFactura= function(factura){
        return  $http.delete("http://localhost:3000/facturas/id/" + factura.id);
    };
});

app.controller('listaFacturas', function($scope, $http, ServicioFacturas){

    function listarConsultas($scope, ServicioFacturas){
        console.log("listar consultas");

        var peticionFacturas = ServicioFacturas.listarFacturas();

        peticionFacturas.success(function(listaFacturas){
            var listaObjetosFacturas = [];
            for(var i = 0; i < listaFacturas.length; i++){
                listaObjetosFacturas.push(new Factura(listaFacturas[i]))
            }

            $scope.listaFacturas = listaObjetosFacturas;
        });
    }

   /* $scope.mostrarLista = false;
    $scope.mostrarFormulario = true;*/

    //Ahora usando data-ng-switch
    // lista --> mostraremos el listado
    // formulario -- mostraremos el formulario.
    $scope.vista="lista";

    listarConsultas($scope, ServicioFacturas);

    $scope.addFactura = function(){
      //  var newFactura = {"id": 4, "concepto": "Nueva compra", "importe": 10};
      //  $scope.listaFacturas.push(new Factura($scope.nuevaFactura));

        console.log($scope.nuevaFactura);
        var peticionNewFactura = ServicioFacturas.addFactura($scope.nuevaFactura);

        peticionNewFactura.success(function(datosNewFactura){
           console.log("POST "  + datosNewFactura);

           $scope.listaFacturas.push(new Factura(datosNewFactura));
        });

        $scope.nuevaFactura.id = "";
        $scope.nuevaFactura.concepto = "";
        $scope.nuevaFactura.importe = "";
/*

        $scope.mostrarLista = true;
        $scope.mostrarFormulario = false;
*/

        $scope.vista="lista";
    };

    /*$scope.calcularIVA = function(factura){
        return factura.importe * 1.21;
    }*/

    $scope.deleteFactura = function(factura){
        /*var listado = $scope.listaFacturas;

        $scope.listaFacturas = listado.filter(function(f){
            return (f !== factura);
        })*/
        var peticionDelete = ServicioFacturas.removerFactura(factura);

        peticionDelete.success(function(idFactura){
            console.log("DELETE : " + idFactura);

            $scope.listaFacturas = $scope.listaFacturas.filter(function(f){
                return (f.id != idFactura);
            })
        })
    };

    $scope.verFormulario = function(){
        console.log("verFormulario");

    /*    $scope.mostrarLista = false;
        $scope.mostrarFormulario = true;*/

        $scope.vista="formulario";
    }

});



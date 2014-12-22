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

app.controller('controladorFacturas', function($scope){
    $scope.factura = {"id": 1, "concepto": "MAC","importe": 10000};
});

app.controller('listaFacturas', function($scope, $http){
    var factura1 = {"id": 1, "concepto": "MAC", "importe":10000};
    var factura2 = {"id": 2, "concepto": "Tablet", "importe": 500};
    var factura3 = {"id": 3, "concepto": "phone", "importe": 1000};

    function listarConsultas($scope){
        console.log("listar consultas");

        var peticionFacturas = $http.get("facturas");

        peticionFacturas.success(function(listaFacturas){
            var listaObjetosFacturas = [];
            for(var i = 0; i < listaFacturas.length; i++){
                listaObjetosFacturas.push(new Factura(listaFacturas[i]))
            }

            $scope.listaFacturas = listaObjetosFacturas;
        });
    }

    /*var listaFacturas = [
        new Factura(factura1),
        new Factura(factura2),
        new Factura(factura3)
    ];

    $scope.listaFacturas = listaFacturas;
*/
    /*var peticionFacturas = $http.get("facturas");
    peticionFacturas.success(function(listaFacturas){
        var listaObjetosFacturas = [];
        for(var i = 0; i < listaFacturas.length; i++){
            listaObjetosFacturas.push(new Factura(listaFacturas[i]))
        }

        $scope.listaFacturas = listaObjetosFacturas;
    });*/

    listarConsultas($scope);

    $scope.addFactura = function(){
      //  var newFactura = {"id": 4, "concepto": "Nueva compra", "importe": 10};
      //  $scope.listaFacturas.push(new Factura($scope.nuevaFactura));

        console.log($scope.nuevaFactura);
        var peticionNewFactura = $http.post("facturas", JSON.stringify( $scope.nuevaFactura ));//new Factura($scope.nuevaFactura));

        peticionNewFactura.success(function(datosNewFactura){
           console.log("POST "  + datosNewFactura);

           $scope.listaFacturas.push(new Factura(datosNewFactura));
        });

        $scope.nuevaFactura.id = "";
        $scope.nuevaFactura.concepto = "";
        $scope.nuevaFactura.importe = "";
    };

    /*$scope.calcularIVA = function(factura){
        return factura.importe * 1.21;
    }*/

    $scope.deleteFactura = function(factura){
        /*var listado = $scope.listaFacturas;

        $scope.listaFacturas = listado.filter(function(f){
            return (f !== factura);
        })*/
        var peticionDelete = $http.delete("facturas/id/" + factura.id);

        peticionDelete.success(function(idFactura){
            console.log("DELETE : " + idFactura);

            $scope.listaFacturas = $scope.listaFacturas.filter(function(f){
                return (f.id != idFactura);
            })
        })
    };



});

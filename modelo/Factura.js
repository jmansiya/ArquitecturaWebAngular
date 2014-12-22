/**
 * Created by Jose Mansilla on 8/12/14.
 */

function Factura(json){
    this.id = json.id;
    this.concepto = json.concepto;
    this.importe = json.importe;

    this.calcularIVA = function(){
        reutrn this.importe * 1.21;
    }
}
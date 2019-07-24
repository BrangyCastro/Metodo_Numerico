var xa = 0;
var xb = 0;
var contador = 0;
var xrAnterior = 0;

var ep = "-";

function validarCampos(){
    var funcion = document.getElementById('txtFuncion').value;
    xa = document.getElementById('txtXa').value;
    xb = document.getElementById('txtXb').value;

    if((funcion == "") || (xa == "") || (xb == "")){
        toastr.error('Los campos no pueden quedar vacios', 'Error!');
    }else{
        interacion();
    }
}

function interacion(){
    var funcion = document.getElementById('txtFuncion').value;
    xa = document.getElementById('txtXa').value;
    xb = document.getElementById('txtXb').value;
    var interacion = document.getElementById('txtInteracion').value;
    var tbCliente = document.getElementById('tbDatos');
    ep = "-";
    if(interacion == ""){
        tbCliente.innerHTML = '';
        do{
            contador++;
            if(xrAnterior == 0){
                sinPorCiento(xa, xb, funcion);
            }else{
                conPorCiento(xa, xb, funcion);           
            }
            tbCliente.innerHTML += llenarTabla(contador, xa, xb, xr, fxa, ep, fxb);
            xa = xb
            xb = xr
        }while(ep != 0);
        contador = 0;
        xrAnterior = 0;
    }else{
        tbCliente.innerHTML = '';
        do{
            contador++;
            if(xrAnterior == 0){
                sinPorCiento(xa, xb, funcion);
            }else{
                conPorCiento(xa, xb, funcion);           
            }
            tbCliente.innerHTML += llenarTabla(contador, xa, xb, xr, fxa, ep, fxb);
            xa = xb
            xb = xr
        }while(contador != interacion);
        contador=0;
        xrAnterior = 0;
    }
}

function sinPorCiento(xa, xb, funcion){
    const evaluacion1 = math.parser();
    evaluacion1.eval("f(x) = "+funcion);
    fxa = evaluacion1.eval("f("+xa+")");

    const evaluacion3 = math.parser();
    evaluacion3.eval("f(x) = "+funcion);
    fxb = evaluacion3.eval("f("+xb+")");

    xr = parseFloat(xb) - (fxb * (parseFloat(xb) - parseFloat(xa)))/(fxb - fxa)
    xrAnterior = xr;

    return xa, xb, xr, fxa, fxb, xrAnterior;
}

function conPorCiento(xa, xb, funcion){
    const evaluacion1 = math.parser();
    evaluacion1.eval("f(x) = "+funcion);
    fxa = evaluacion1.eval("f("+xa+")");

    const evaluacion3 = math.parser();
    evaluacion3.eval("f(x) = "+funcion);
    fxb = evaluacion3.eval("f("+xb+")");

    xr = parseFloat(xb) - (fxb * (parseFloat(xb) - parseFloat(xa)))/(fxb - fxa)
    
    xrActual = xr;

    ep = Math.abs((xrActual-xrAnterior)/xrActual)*100;
    xrAnterior = xr; 

    return xa, xb, xr, fxa, ep, xrAnterior, xrActual, fxb;
}





function llenarTabla(contador, xa, xb, xr, fxa, ep, fxb){
    return `
    <tr>
        <td>${contador}</td>
        <td>${financial(xa)}</td>
        <td>${financial(xb)}</td>
        <td>${financial(fxa)}</td>
        <td>${financial(fxb)}</td>
        <td>${xr}</td>
        <td>${financial(ep)+" %"}</td>
    </tr>
    `
}

function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}

function limpiar(){
    document.getElementById('tbDatos').innerHTML = '';
    document.getElementById('txtFuncion').value = "";
    document.getElementById('txtXa').value = "";
    document.getElementById('txtXb').value = "";
    document.getElementById('txtInteracion').value = "";
}

function financial(x) {
    return Number.parseFloat(x).toFixed(6);
  }
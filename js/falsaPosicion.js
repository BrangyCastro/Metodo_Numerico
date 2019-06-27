//Metodo de Falsa Posicion


var xa = 0;
var xb = 0;
var xr = 0;
var fxa = 0;
var fxr = 0;
var fxb = 0;
var fxafxr = 0
var xrActual = 0;
var xrAnterior = 0;
var contador = 0;

var ep = "-";

function validarCampos(){
    var funcion = document.getElementById('txtFuncion').value;
    xa = document.getElementById('txtXa').value;
    xb = document.getElementById('txtXb').value;

    if((funcion == "") || (xa == "") || (xb == "")){
        toastr.error('Los campos no pueden quedar vacios', 'Error!');
    }else{
        verificarRaiz();
    }
}

function verificarRaiz(){
    var funcion = document.getElementById('txtFuncion').value;
    xa = document.getElementById('txtXa').value;
    xb = document.getElementById('txtXb').value;

    const evaluacion1 = math.parser();
    evaluacion1.eval("f(x) = "+funcion);
    fxa = evaluacion1.eval("f("+xa+")");

    const evaluacion2 = math.parser();
    evaluacion2.eval("f(x) = "+funcion);
    fxr = evaluacion2.eval("f("+xb+")");

    if(fxa < 0){
        if(fxr > 0){
            toastr.success('Interacciones con exitos..!!', 'Muy Bien');
            interacion();
        }else{
            toastr.error('No existe raiz', 'Error!');
        }
    }else{
        if(fxr < 0){
            toastr.success('Interacciones con exitos..!!', 'Muy Bien');
            interacion();
        }else{
            toastr.error('No existe raiz', 'Error!');
        }
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
            tbCliente.innerHTML += llenarTabla(contador, xa, xb, xr, fxa, fxr, fxafxr, ep, fxb);
            if(fxafxr > 0){
                xa = xr
            }else{
                xb = xr
            } 
            
        }while(ep != 0);
        contador = 0;
        xrAnterior = 0;
    }else{
        tbCliente.innerHTML = '';
        do{
            contador++;
            if(xrAnterior == 0){
                sinPorCiento(xa, xb, funcion);
                // console.log(xa);
                // console.log(xb);
                // console.log(fxafxr);
            }else{
                conPorCiento(xa, xb, funcion);           
            }
            tbCliente.innerHTML += llenarTabla(contador, xa, xb, xr, fxa, fxr, fxafxr, ep, fxb);
            if(fxafxr > 0){
                xa = xr
            }else{
                xb = xr
            }
        }while(contador != interacion);
        contador=0;
        xrAnterior = 0;
    }
    
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

function signoMasMenos(x){
    if(x < 0){
        return "-";
    }else{
        return "+";
    }
}

function sinPorCiento(xa, xb, funcion){
    const evaluacion1 = math.parser();
    evaluacion1.eval("f(x) = "+funcion);
    fxa = evaluacion1.eval("f("+xa+")");

    const evaluacion3 = math.parser();
    evaluacion3.eval("f(x) = "+funcion);
    fxb = evaluacion3.eval("f("+xb+")");

    xr = ( parseFloat(xa)*fxb ) - ( parseFloat(xb)*fxa) / (fxb-fxa);
    xrAnterior = xr;

    const evaluacion2 = math.parser();
    evaluacion2.eval("f(x) = "+funcion);
    fxr = evaluacion2.eval("f("+xr+")");

    fxafxr = fxa * fxr;

    return xa, xb, xr, fxa, fxr, fxafxr, xrAnterior, fxb;
}

function conPorCiento(xa, xb, funcion){
    const evaluacion1 = math.parser();
    evaluacion1.eval("f(x) = "+funcion);
    fxa = evaluacion1.eval("f("+xa+")");

    const evaluacion3 = math.parser();
    evaluacion3.eval("f(x) = "+funcion);
    fxb = evaluacion3.eval("f("+xb+")");

    xr = (( parseFloat(xa)*fxb ) - ( parseFloat(xb)*fxa)) / (fxb-fxa);
    xrActual = xr;

    const evaluacion2 = math.parser();
    evaluacion2.eval("f(x) = "+funcion);
    fxr = evaluacion2.eval("f("+xr+")");

    fxafxr = fxa * fxr;
    ep = Math.abs((xrActual-xrAnterior)/xrActual)*100;
    xrAnterior = xr; 

    return xa, xb, xr, fxa, fxr, fxafxr, ep, xrAnterior, xrActual, fxb;
}

function llenarTabla(contador, xa, xb, xr, fxa, fxr, fxafxr, ep, fxb){
    return `
    <tr>
        <td>${contador}</td>
        <td>${financial(xa)}</td>
        <td>${financial(xb)}</td>
        <td>${xr}</td>
        <td>${financial(fxa)}</td>
        <td>${financial(fxb)}</td>
        <td>${financial(fxr)}</td>
        <td>${signoMasMenos(fxafxr)}</td>
        <td>${financial(ep)+" %"}</td>
    </tr>
    `
}

function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}

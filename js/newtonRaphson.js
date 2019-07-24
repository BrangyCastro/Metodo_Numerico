





function derivada(){
    var funcion = document.getElementById('txtFuncion').value;
    console.log(funcion);
    // const deri = math.parse(funcion);
    // console.log(math.derivative(deri,"x").toString);
    const h = math.parse(funcion);
    const x = math.parse('x')
    const dh = math.derivative(h, x)
    console.log(dh.toString())
    console.log(dh.eval({x: 1}))
    console.log(h.eval({x: 1}))
}


var fxn = 0;
var fdxn = 0;
var xn = 0;
var derivada = 0;
var xnAnterior = 0;
var xnActual = 0;
var contador = 0;

var ep = "-";

function prueba(){
    var funcion = document.getElementById('txtFuncion').value;
    var xn = document.getElementById('txtXn').value;;
    const h = math.parse(funcion);
    const x = math.parse('x');
    const dh = math.derivative(h, x);

    fxn = h.eval({x: xn});
    fdxn = dh.eval({x: xn});
    xnAnterior = xn;

    xnActual = xnAnterior - (fxn / fdxn);

    xn = xnActual;

    console.log(fxn);
    console.log(fdxn);
    console.log(xnAnterior);
    console.log(xnActual);
    console.log(xn);
}


function validarCampos(){
    var funcion = document.getElementById('txtFuncion').value;
    xn = document.getElementById('txtXn').value;

    if((funcion == "") || (xn == "")){
        toastr.error('Los campos no pueden quedar vacios', 'Error!');
    }else{
        interacion();
    }
}

function interacion(){
    var funcion = document.getElementById('txtFuncion').value;
    xn = document.getElementById('txtXn').value;
    var interacion = document.getElementById('txtInteracion').value;
    var tbCliente = document.getElementById('tbDatos');
    ep = "-";
    if(interacion == ""){
        tbCliente.innerHTML = '';
        do{
            contador++;
            if(xnAnterior == 0){
                sinPorCiento(xn, funcion);
                
            }else{
                conPorCiento(xn, funcion);           
            }
            xn = xnActual;
            tbCliente.innerHTML += llenarTabla(contador, xnAnterior, fxn, fdxn, xnActual, ep);
        }while(ep != 0);
        contador = 0;
        xnAnterior = 0;
    }else{
        tbCliente.innerHTML = '';
        do{
            contador++;
            if(xnAnterior == 0){
                sinPorCiento(xn, funcion);
            }else{
                conPorCiento(xn, funcion);           
            }
            xn = xnActual;
            tbCliente.innerHTML += llenarTabla(contador, xnAnterior, fxn, fdxn, xnActual, ep);
        }while(contador != interacion);
        contador=0;
        xnAnterior = 0;
    }
    
}

function limpiar(){
    document.getElementById('tbDatos').innerHTML = '';
    document.getElementById('txtFuncion').value = "";
    document.getElementById('txtXn').value = "";
    document.getElementById('txtInteracion').value = "";
}

function financial(x) {
    return Number.parseFloat(x).toFixed(6);
  }

function sinPorCiento(xn, funcion){

    const h = math.parse(funcion);
    const x = math.parse('x');
    const dh = math.derivative(h, x);

    fxn = h.eval({x: xn});
    fdxn = dh.eval({x: xn});
    xnAnterior = xn;

    xnActual = xnAnterior - (fxn / fdxn);

    return fxn, fdxn, xnActual,xnAnterior;
}

function conPorCiento(xn, funcion){

    const h = math.parse(funcion);
    const x = math.parse('x');
    const dh = math.derivative(h, x);

    fxn = h.eval({x: xn});
    fdxn = dh.eval({x: xn});
    ep = Math.abs(((xnActual-xnAnterior)/xnActual)*100);
    xnActual = xn - (fxn / fdxn);
    console.log(xnActual);
    console.log(xnAnterior);
    
    
    xnAnterior = xn;

    return fxn, fdxn, xnActual, ep,xnAnterior;
    
}

function llenarTabla(contador, xn, fxn, fdxn, xnActual, ep){
    return `
    <tr>
        <td>${"X"+contador}</td>
        <td>${financial(xn)}</td>
        <td>${financial(fxn)}</td>
        <td>${financial(fdxn)}</td>
        <td>${financial(xnActual)}</td>
        <td>${financial(ep) + " %"}</td>
    </tr>
    `
}

function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}
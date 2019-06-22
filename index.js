// metodo de biseccion

   
var xa = 0;
var xb = 0;
var xr = 0;
var fxa = 0;
var fxr = 0;
var fxafxr = 0
var xrActual = 0;
var xrAnterior = 0;
var contador = 0;

function datos(){
    xa = document.getElementById('txtXa').value;
    xb = document.getElementById('txtXb').value;
    xr = (parseFloat(xa) + parseFloat(xb))/2;
    console.log(xr);
}

function errorP(){
    toastr.error('Pagina en construcion', 'Error!');
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
    if(interacion == ""){
        tbCliente.innerHTML = '';
        do{
            contador++;
            if(xrAnterior == 0){
                console.log(xa);
                xr = (parseFloat(xa) + parseFloat(xb))/2;
                xrAnterior = xr;
                const evaluacion1 = math.parser();
                evaluacion1.eval("f(x) = "+funcion);
                fxa = evaluacion1.eval("f("+xa+")");
    
                const evaluacion2 = math.parser();
                evaluacion2.eval("f(x) = "+funcion);
                fxr = evaluacion2.eval("f("+xr+")");
                fxafxr = fxa * fxr;
            }else{
                xr = (parseFloat(xa) + parseFloat(xb))/2;
                xrActual = xr;
                const evaluacion1 = math.parser();
                evaluacion1.eval("f(x) = "+funcion);
                fxa = evaluacion1.eval("f("+xa+")");
                const evaluacion2 = math.parser();
                evaluacion2.eval("f(x) = "+funcion);
                fxr = evaluacion2.eval("f("+xr+")");
                fxafxr = fxa * fxr;
                var ep = Math.abs((xrActual-xrAnterior)/xrActual)*100;
                xrAnterior = xr;            
            }
            tbCliente.innerHTML += `
                <tr>
                    <td>${contador}</td>
                    <td>${xa}</td>
                    <td>${xb}</td>
                    <td>${xr}</td>
                    <td>${fxa}</td>
                    <td>${fxr}</td>
                    <td>${fxafxr}</td>
                    <td>${ep}</td>
                </tr>
                `
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
                xr = (parseFloat(xa) + parseFloat(xb))/2;
                xrAnterior = xr;
                const evaluacion1 = math.parser();
                evaluacion1.eval("f(x) = "+funcion);
                fxa = evaluacion1.eval("f("+xa+")");
    
                const evaluacion2 = math.parser();
                evaluacion2.eval("f(x) = "+funcion);
                fxr = evaluacion2.eval("f("+xr+")");
                fxafxr = fxa * fxr;
            }else{
                xr = (parseFloat(xa) + parseFloat(xb))/2;
                xrActual = xr;
                const evaluacion1 = math.parser();
                evaluacion1.eval("f(x) = "+funcion);
                fxa = evaluacion1.eval("f("+xa+")");
                const evaluacion2 = math.parser();
                evaluacion2.eval("f(x) = "+funcion);
                fxr = evaluacion2.eval("f("+xr+")");
                fxafxr = fxa * fxr;
                var ep = Math.abs((xrActual-xrAnterior)/xrActual)*100;
                xrAnterior = xr;            
            }
            tbCliente.innerHTML += `
                <tr>
                    <td>${contador}</td>
                    <td>${xa}</td>
                    <td>${xb}</td>
                    <td>${xr}</td>
                    <td>${fxa}</td>
                    <td>${fxr}</td>
                    <td>${fxafxr}</td>
                    <td>${ep}</td>
                </tr>
                `
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
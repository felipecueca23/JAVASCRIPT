function reducirTeclas(elemento){

  elemento.style.transform = "scale(0.9,0.9)";


  }

function restaurarTeclas(elemento){
    elemento.style.transform = "scale(1,1)";
}

function CapturarTeclas(elemento){
  if (document.getElementById('display').innerHTML.length<"8"){


      if ( elemento.id=="0" && document.getElementById('display').innerHTML.length=="0"){
          document.getElementById('display').innerHTML= elemento.id;
      }else{
          if(document.getElementById('display').innerHTML=="0"){
              document.getElementById('display').innerHTML= elemento.id;
          }else{
              document.getElementById('display').innerHTML= document.getElementById('display').innerHTML + elemento.id;
          }

      }
  }
  return(document.getElementById('display').innerHTML);
}



function limpiarPantalla(){
    document.getElementById('display').innerHTML= "0";
    limpiarVar();
}


function puntoPantalla(){
    if (document.getElementById('display').innerHTML.indexOf(".") == "-1") {
        document.getElementById('display').innerHTML= document.getElementById('display').innerHTML + ".";
    }
}


function signoPantalla(){
    if (document.getElementById('display').innerHTML.indexOf("-") == "0") {
        document.getElementById('display').innerHTML=document.getElementById('display').innerHTML.substring(1,document.getElementById('display').innerHTML.length);
    }else {
      document.getElementById('display').innerHTML="-" +document.getElementById('display').innerHTML;
    }
}

function igualPantalla(){
  resulta = valorTamaño(calcularOperacion(termino1, termino2 , signo));
  document.getElementById('display').innerHTML=resulta ;
  }

function limpiarVar(){
   resulta=null;
   termino1=null;
   termino2=null;
   termino3=null;
   signo="";
   signoa="";
   signoaa="";
}

function operacionesTeclas(elemento) {
    if (elemento.id=="dividido"){
        operacion="/";
      }else if (elemento.id=="por"){
        operacion="*";
      }else if (elemento.id=="menos"){
        operacion="-";
      }else if (elemento.id=="mas") {
        operacion="+";
      }  else if (elemento.id=="igual") {
          operacion="=";
      }
      if (document.getElementById('display').innerHTML!= "0" ) {
        document.getElementById('display').innerHTML= "" ;
      }


      return operacion;
}

function calcularOperacion(operando1, operando2, operacion){
var resultadi=0;
  if(operacion == "/"){
    resultado = operando1 / operando2;
  }else if (operacion == "*") {
    resultado = operando1 * operando2;
  }else if (operacion == "-") {
    resultado = operando1 - operando2;
  }else if (operacion == "+") {
    resultado = parseFloat(operando1) + parseFloat(operando2);
  }


return resultado;

}


function valorTamaño(valor){

  if (valor.toString().length>8){
    valor=valor.toString().substring(0, 8);
  }
 return valor;
}

/*-------------------------------------------------------------*/
var resulta=null;
var termino1=null;
var termino2=null;
var termino3=null;
var signo="";
var signoa="";
var signoaa="";

var Calculadora = {
  init: function(){
  this.asignarEventosTeclas('tecla');
  document.getElementById('on').onclick = limpiarPantalla;
  document.getElementById('punto').onclick = puntoPantalla;
  document.getElementById('sign').onclick = signoPantalla;
/*  document.getElementById('igual').onclick = igualPantalla;*/
},
asignarEventosTeclas: function(selector){
  var teclas = document.getElementsByClassName(selector);
  for (var i = 0; i < teclas.length; i++) {
    teclas[i].onmousedown= this.eventoReducirTeclas;
    teclas[i].onmouseup = this.eventoRestaurarTeclas;
    if(teclas[i].alt =="dividido" || teclas[i].alt =="por" || teclas[i].alt =="menos" || teclas[i].alt =="mas" || teclas[i].alt =="igual") {
      teclas[i].onclick= this.eventoOperaciones;
    }else{
      teclas[i].onclick = this.eventoCapturarTeclas;
   }

  }
},
eventoReducirTeclas: function(event){
  reducirTeclas(event.target);
},
eventoRestaurarTeclas: function(event){
  restaurarTeclas(event.target);
},
eventoCapturarTeclas: function(event){
  termino2 = CapturarTeclas(event.target);
  document.getElementById('display').innerHTML= termino2 ;
  },
eventoOperaciones: function(event){
  signoa=signo;
  signo = operacionesTeclas(event.target);
  termino1=resulta;
  if (termino2!=null){
      resulta = termino2;
  }

  if(termino1 !=null){
      if (signo=="=" && signoa!="="){
          resulta = valorTamaño(calcularOperacion(termino1, termino2 , signoa));
          document.getElementById('display').innerHTML=resulta ;
          termino3=termino2;
          signoaa= signoa;
          termino2=null;
      }else if (signo=="=" && signoa=="=") {
          resulta = valorTamaño(calcularOperacion(termino1, termino3 , signoaa));
          document.getElementById('display').innerHTML=resulta ;

      }else if(termino2!=null){
          resulta = valorTamaño(calcularOperacion(termino1, termino2 , signoa));
          document.getElementById('display').innerHTML="" ;
      }
  }
 }
}

Calculadora.init();

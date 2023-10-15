import actores from "./assets/modulos.js";

// pasar el campo movies a array
actores.forEach(
  (actor) => (actor.movies = actor.movies.split(",").map((peli) => peli.trim()))
);
console.log(actores);

// ------------ declaracion de variables
const campoPregunta = document.getElementById("textoPregunta");

let pregunta = "";
let respuestaCorrecta = [];
let enunciadoCorrecto = "";
let preguntasHechas = new Set();
let aciertos = 0;
let totalPreguntas = 0;
const emojiFeliz = String.fromCodePoint(0x1f604);
const emojiTriste = String.fromCodePoint(0x1f613);
const emote = [emojiTriste, emojiFeliz];

// ------------ declaracion de funciones
function calcularPregunta(numActor, tipoPregunta) {
  let actorEscogido = actores[numActor];
  let nombre = actorEscogido.first_name + " " + actorEscogido.last_name,
    edad = actorEscogido.age,
    pais = actorEscogido.country,
    pelis = actorEscogido.movies;

  switch (tipoPregunta) {
    case 1:
      console.log(edad);
      pregunta = `¿Qué edad tiene ${nombre}?`;
      respuestaCorrecta = [edad];
      enunciadoCorrecto = `${nombre} tiene ${edad} años.`;
      break;
    case 2:
      console.log(pais);
      pregunta = `¿De qué país es ${nombre}?`;
      respuestaCorrecta = [pais];
      enunciadoCorrecto = `${nombre} es de ${pais}.`;
      break;
    case 3:
      console.log(pelis);
      pregunta = `¿Sabría decirnos alguna película donde actúe ${nombre}?`;
      respuestaCorrecta = pelis;
      enunciadoCorrecto = `${nombre} actua en `;
      for (let peli in pelis) {
        if (peli == pelis.length - 1) {
          enunciadoCorrecto += `y ${pelis[peli]}.`;
        } else {
          enunciadoCorrecto += `${pelis[peli]}, `;
        }
      }
      break;
  }
}

function nuevaPregunta(){
  let estaPregunta = generarPregunta();
  while (preguntasHechas.has(nuevaPregunta)) {
    estaPregunta = generarPregunta();
  }
  calcularPregunta(estaPregunta[0],estaPregunta[1]);
  preguntasHechas.add(estaPregunta);
  totalPreguntas++;
  campoPregunta.innerHTML = pregunta;
}

function generarPregunta() {
  console.log(preguntasHechas);
  limpiarCampos();

  let numeroActorEscogido = Math.round(Math.random() * actores.length);
  let tipoPregunta = Math.round(Math.random() * 3);
  
  return [numeroActorEscogido,tipoPregunta];
}

function limpiarCampos() {  
  document.getElementById("respuesta").value = "";
  let cabecera = `Su resultado: ${totalPreguntas} preguntas realizadas, ${aciertos} preguntas acertadas`;
  document.getElementById("resultadoHeader").innerHTML = cabecera;
  document.getElementById("resultadoTitle").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
}

function comprobarRespuesta() {
  const respuestaDada = document.getElementById("respuesta").value;
  console.log(respuestaDada);
  let acertado = 0;
  for (let acierto of respuestaCorrecta) {
    if (respuestaDada == acierto) {
      aciertos++;
      acertado = 1;
    }
  }
  limpiarCampos();
  document.getElementById("resultadoTitle").innerHTML = emote[acertado];
  document.getElementById("resultado").innerHTML = enunciadoCorrecto;
}

function init() {
  document
    .getElementById("enviarRespuesta")
    .addEventListener("click", comprobarRespuesta);
  document
    .getElementById("siguientePregunta")
    .addEventListener("click", nuevaPregunta);
  nuevaPregunta();
}

// ------------ inicio del programa
init();

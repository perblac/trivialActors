import actores from "./assets/modulos.js";

// pasar el campo movies a array
actores.forEach(
  (actor) => (actor.movies = actor.movies.split(",").map((peli) => peli.trim()))
);

// ------------ declaracion de variables
const campoPregunta = document.getElementById("textoPregunta");

let pregunta = ""; // pregunta que se está realizando
let respuestaCorrecta = []; // array con las respuestas correctas
let enunciadoCorrecto = ""; // enunciado de la respuesta correcta
let preguntaId = ""; //estaPregunta[numActor] + "-" + estaPregunta[tipoPregunta];
let preguntasHechas = new Set(); // set de preguntaId que guarda las que ya se han respondido
let aciertos = 0; // total de preguntas acertadas
let totalPreguntas = 0; // total de preguntas respondidas
const emojiFeliz = String.fromCodePoint(0x1f604);
const emojiTriste = String.fromCodePoint(0x1f613);
const emote = [emojiTriste, emojiFeliz];

// ------------ declaracion de funciones

/**
 * Realiza una nueva pregunta que aun no se haya respondido, hasta un máximo de actores.length * 3
 */
function nuevaPregunta() {
  let estaPregunta = []; // [numActor, tipoPregunta]
  let final = 0; // flag de haber realizado todas las preguntas
  do {
    estaPregunta = generarNumeros();
    preguntaId = estaPregunta[0] + "-" + estaPregunta[1];
    final = preguntasHechas.size >= actores.length * 3 ? 1 : 0;
  } while (preguntasHechas.has(preguntaId) && !final);

  if (final) {
    campoPregunta.innerHTML = `¡Se han terminado todas las preguntas!`;
  } else {
    const [numActor, tipoPregunta] = estaPregunta;
    // calcularPregunta(estaPregunta[0],estaPregunta[1]);
    generarPregunta(numActor, tipoPregunta);
    campoPregunta.innerHTML = pregunta;
  }
}

/**
 * Genera numeros aleatorios para numActor y tipoPregunta
 *
 * @returns Array
 */
function generarNumeros() {
  let numeroActorEscogido = Math.floor(Math.random() * actores.length);
  let tipoPregunta = Math.floor(Math.random() * 3) + 1; // tipos: 1 -> edad, 2 -> pais, 3 -> peli
  return [numeroActorEscogido, tipoPregunta];
}

/**
 * Genera pregunta y respuesta en base a dos valores numéricos
 *
 * @param {Number} numActor
 * @param {Number} tipoPregunta
 */
function generarPregunta(numActor, tipoPregunta) {
  let actorEscogido = actores[numActor];

  let nombre = actorEscogido.first_name + " " + actorEscogido.last_name,
    edad = actorEscogido.age,
    pais = actorEscogido.country,
    pelis = actorEscogido.movies;

  switch (tipoPregunta) {
    case 1:
      // console.log(edad); //CHEATMODE
      pregunta = `¿Qué edad tiene ${nombre}?`;
      respuestaCorrecta = [edad];
      enunciadoCorrecto = `${nombre} tiene ${edad} años.`;
      break;
    case 2:
      // console.log(pais); //CHEATMODE
      pregunta = `¿De qué país es ${nombre}?`;
      respuestaCorrecta = [pais];
      enunciadoCorrecto = `${nombre} es de ${pais}.`;
      break;
    case 3:
      // console.log(pelis); //CHEATMODE
      pregunta = `¿Sabría decirnos alguna película donde actúe ${nombre}?`;
      respuestaCorrecta = pelis;
      enunciadoCorrecto =
        `${nombre} actua en ` +
        pelis
          .map((peli, index) =>
            index == pelis.length - 1 ? `y ${peli}.` : `${peli}, `
          )
          .join("");
      break;
  }
}

/**
 * Comprueba la respuesta dada a la pregunta, o genera una nueva pregunta si ya se respondió.
 */
function comprobarRespuesta() {
  if (!preguntasHechas.has(preguntaId)) {
    const respuestaDada = document.getElementById("respuesta").value;
    let acertado = 0; // flag para mostrar acierto o fallo
    for (let acierto of respuestaCorrecta) {
      if (respuestaDada == acierto) {
        aciertos++;
        acertado = 1;
      }
    }
    // escribimos el resultado
    limpiarCampos();
    document.getElementById("resultadoTitle").innerHTML = emote[acertado];
    document.getElementById("resultado").innerHTML = acertado
      ? "¡Correcto! " + enunciadoCorrecto
      : "¡Qué pena! " + enunciadoCorrecto;
    // guardamos preguntaId de la pregunta realizada para no repetirla, e incrementamos el nº de preguntas realizadas
    preguntasHechas.add(preguntaId);
    totalPreguntas++;
  } else {
    limpiarCampos();
    nuevaPregunta();
  }
}

/**
 * Limpia los campos de respuesta y resultado de la última pregunta
 */
function limpiarCampos() {
  document.getElementById("respuesta").value = "";
  let cabecera = `Su resultado: ${totalPreguntas} preguntas respondidas, ${aciertos} preguntas acertadas`;
  document.getElementById("resultadoHeader").innerHTML = cabecera;
  document.getElementById("resultadoTitle").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
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

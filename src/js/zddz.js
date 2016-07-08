import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";
import glitch from "./glitch.js";


$(document).ready(() => {
  console.log("hello");

  let images = $('[glitch-img]');

  glitch(images);

  window.GLITCHCANVAS = glitchCanvas;


});




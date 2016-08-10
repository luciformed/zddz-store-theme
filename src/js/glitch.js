import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";
import Rx from "../../bower_components/rxjs/dist/rx.all.js";


const DEFAULT_PARAMS = {
  quality: 37,
  amount: 70,
  iterations: 20,
  mousemove_throttle:300,
  glitch_throttle:5000,
  glitch_chance : 15,
  second_glitch:50,
  flash: 1
};

let getRand100 = () => {
  return Math.round(Math.random() * 100);
};

let getGlitchParams = () => {

  return {
    seed: getRand100(), // integer between 0 and 99
    quality: DEFAULT_PARAMS['quality'],
    amount: DEFAULT_PARAMS['amount'],
    iterations: DEFAULT_PARAMS['iterations'],
  }
}


// let throttled = _.throttle(() => {

// }, 500);


export default function glitch(elements, cfg) {
  elements.each((index, el) => {
    el = $(el);
    let imgSrc = el.data('img-src');
    if (!imgSrc) {
      throw new Error("No image source");
    }


    let image = new Image();
    image.setAttribute('crossOrigin', '');
    let originalImgDataUrl;

    let setToOriginalImage = () => {
      el.css('background-image', `url(${imgSrc})`);
    };

    let setGlitchedImage = () => {
      console.time('toglitch');
      return glitchCanvas(getGlitchParams())
        .fromImage(image)
        .toDataURL()
        .then((dataURL) => {
          console.timeEnd('toglitch');
          el.css('background-image', `url(${dataURL}), url(${imgSrc})`);
        })
    };

    image.src = imgSrc;


    image.onload = () => {
      setToOriginalImage();
      glitchCanvas()
        .fromImage(image)
        .toDataURL()
        .then(function(dataURL) {
          originalImgDataUrl = dataURL;
        });
    };


    let mouseMove = Rx.Observable.fromEvent(el, "mousemove");

    let mouseWheel = Rx.Observable.fromEvent(el, "mousewheel");

    let wait = (time) => {
      return () => {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, time);
        });
      }
    }

    mouseMove
    .merge(mouseWheel)
    .throttle(DEFAULT_PARAMS.mousemove_throttle)
    .filter(() => getRand100() < DEFAULT_PARAMS.glitch_chance)
    .throttle(DEFAULT_PARAMS.glitch_throttle)
    .subscribe(() => {
      setGlitchedImage()
        .then(wait(DEFAULT_PARAMS.second_glitch))
        .then(setGlitchedImage)
        .then(wait(DEFAULT_PARAMS.flash))
        .then(setToOriginalImage);
    });

  });
};

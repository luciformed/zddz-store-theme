import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";

console.log(glitchCanvas, 'glitchCanvas');



const DEFAULT_PARAMS = {
  quality: 99,
  amount: 62,
  iterations: 11,
  interval: 25000,
  flash: 150
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
    console.log('element', index, el);
    el = $(el);
    let imgSrc = el.data('img-src');
    if (!imgSrc) {
      throw new Error("No image source");
    }

    console.log({
      imgSrc
    });

    let image = new Image();
    image.setAttribute('crossOrigin', '');
    let originalImgDataUrl;

    let setToOriginalImage = () => {
      el.css('background-image', `url(${imgSrc})`);
    };

    let setGlitchedImage = () => {
      // console.log(getGlitchParams());
      glitchCanvas(getGlitchParams())
        .fromImage(image)
        .toDataURL()
        .then((dataURL) => {
          el.css('background-image', `url(${dataURL}), url(${imgSrc})`);
        })
    };

    image.src = imgSrc;


    image.onload = () => {
      console.log('imgloaded')
      setToOriginalImage();
      glitchCanvas()
        .fromImage(img)
        .toDataURL()
        .then(function(dataURL) {
          console.log('dataUrl');
          originalImgDataUrl = dataURL;
          // el.data("img-original-data-url", dataURL);
        });
    };

    let glitchInterval;

    el.on('mouseover', () => {
      // setGlitchedImage();
      console.log('mouseover');
      glitchInterval = setInterval(() => {
        setGlitchedImage();
        setTimeout(setToOriginalImage, DEFAULT_PARAMS.flash);
      }, DEFAULT_PARAMS.interval)

    });

    el.on('mouseout', () => {
      console.log('mouseout');
      clearInterval(glitchInterval);
      setToOriginalImage();
    });

  });
};

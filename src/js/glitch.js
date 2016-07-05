import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";

console.log(glitchCanvas, 'glitchCanvas');

window.glitchCanvas = glitchCanvas;
window.TEST = 5;

let getRand100 = () => {
  return Math.round(Math.random() * 100);
};

let getInputVal = (name) => {

  return $(`input[name=${name}]`).val();
};


let getGlitchParams = () => {

  return {
    seed: getRand100(), // integer between 0 and 99
    quality: getInputVal('quality') || 1,
    amount: getInputVal('amount') || 1,
    iterations: getInputVal('iterations') || 1,
  }
}

let glitchEl = $('.glitch-test');


let img = new Image();

let testImgUrl = '../images/t-shirt-big.jpg'

let setToOriginalImage = () => {
  glitchEl.css('background-image', `url(${testImgUrl})`);
};

let setGlitchedImage = () => {
  console.log(getGlitchParams());
  glitch(getGlitchParams())
    .fromImage(img)
    .toDataURL()
    .then((dataURL) => {
      glitchEl.css('background-image', `url(${dataURL}), url(${testImgUrl})`);
    })

};



// let throttled = _.throttle(() => {

// }, 500);

let glitchInterval;

glitchEl.on('mouseover', () => {
  // setGlitchedImage();
  console.log('mouseover');
  glitchInterval = setInterval(() => {
    setGlitchedImage();
    setTimeout(setToOriginalImage, 250);
  }, 500)

});

glitchEl.on('mouseout', () => {
  console.log('mouseout');
  clearInterval(glitchInterval);
  setToOriginalImage();
});




setToOriginalImage();

img.src = testImgUrl;

img.onload = () => {

  glitch()
    .fromImage(img)
    .toDataURL()
    .then(function(dataURL) {
      // var glitchedImg = new Image();
      // glitchedImg.src = dataURL;

      // glitchEl.css('background-image', 'url')
      // document.body.appendChild(glitchedImg);
    });
};


export default function g() {

}

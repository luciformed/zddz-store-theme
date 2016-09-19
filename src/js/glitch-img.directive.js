import glitch from "./glitch.js";

export default function zddzGlitchImgDirective() {
  return {
    restrict: "A",
    link(scope, element, attrs) {
      // console.debug({
      //   attrs
      // });

      attrs.$observe('imgSrc', () => {
        console.debug('observe', attrs.imgSrc);
        glitch(element, {
          src: attrs.imgSrc
        });
      });
    }
  }
}

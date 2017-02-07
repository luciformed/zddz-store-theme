import glitch from "./glitch.js";

export default function zddzGlitchImgDirective() {
  return {
    restrict: "A",
    link(scope, element, attrs) {
      // console.debug({
      //   attrs
      // });
      //
      let sub = null;

      attrs.$observe('imgSrc', () => {
        if(sub) {
          sub.dispose();
        }
        sub = glitch(element, {
          src: attrs.imgSrc
        });
      });
    }
  }
}

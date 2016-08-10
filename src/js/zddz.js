import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";
import glitch from "./glitch.js";
import angular from "../../bower_components/angular/index.js";;
import {
  tryCatch
} from "../../bower_components/ramda/dist/ramda.js";
import {
  Observable
} from "../../bower_components/rxjs/dist/rx.all.js";

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


$(document).ready(() => {
  let images = $('[glitch-img]');
  glitch(images);

  let DZ = $('[am-DZ]');

  let order = getRandomIntInclusive(5, 7);

  DZ.attr('am-Flex-Item', `order:${order}`);

});




let app = angular.module('zddz', []).config(['$interpolateProvider', ($interpolateProvider) => {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
}]).run(($http) => {});

app.filter('zddzSize', () => {
  return (sizeName) => {
    // console.log({
    //   sizeName
    // });
    return {
      "X-Small": "XS",
      "Small": "S",
      "Medium": "M",
      "Large": "L"
    }[sizeName];
  };
});

app.controller('ProductCtrl', function($scope, $data) {
  // console.log('productctrl', this, $scope, $data);
  window.productctrl = this;

});

app.directive('zddzInStock', () => {
  let soldOutElWidth = 20;

  let redTape = (element) => {
    let soldOutEl = angular.element('<div am-Sold-Out> </div>');

    element.append(soldOutEl);

    return () => {
      /*<3 пифагор*/
      let width = element.outerWidth();
      let height = element.outerHeight();

      let c = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

      soldOutEl.height(c);
      soldOutEl.width(soldOutElWidth);

      let atan = Math.atan(width / height);

      let degrees = atan * (180 / Math.PI);

      soldOutEl.css({
        'transform': `rotate(${degrees}deg)`,
        'top': `${(height - c)/2}px`,
        'left': `${(width /2) - (soldOutElWidth / 2) }px`
      });

    }

  }



  return {
    restrict: "A",
    link(scope, element, attrs) {

      let inStock = attrs.zddzInStock != "false";

      if (!inStock) {

        let adjustPosition = redTape(element);

        let sub = Observable.fromEvent(window, 'resize')
        .debounce(50).startWith(null).subscribe(adjustPosition);

        scope.$on('$destroy', sub.dispose.bind(sub));

      }

    }
  }
})

app.directive('zddzCtrl', ($controller) => {

  return {
    restrict: "A",
    link(scope, element, attrs) {

      let data = tryCatch(() => JSON.parse(attrs.zddzData.replace(/`/g, '"')), () => ({}))();

      let ctrl = $controller(attrs.zddzCtrl, {
        $scope: scope,
        $data: data
      });
      // console.log('attrs.data', data);

      // ctrl.$data = attrs.zddzData;
    }
  };
});

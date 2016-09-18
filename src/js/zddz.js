// import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";
// import glitch from "./glitch.js";
import angular from "../../bower_components/angular/index.js";

import {
  tryCatch
} from "../../bower_components/ramda/dist/ramda.js";
import {
  Observable
} from "../../bower_components/rxjs/dist/rx.all.js";

import shopify from './shopify-api.js';

import productCtrl from "./product.controller.js";

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var log = console.debug.bind(console);


$(document).ready(() => {
  let images = $('[glitch-img]');
  /*TMP*/
  // glitch(images);

  let DZ = $('[am-DZ]');

  let order = getRandomIntInclusive(5, 7);

  DZ.attr('am-Flex-Item', `order:${order}`);

});




let app = angular.module('zddz', [shopify.name]).config(['$interpolateProvider', ($interpolateProvider) => {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
}]).run(($http) => {});

app.controller('ProductCtrl', productCtrl);

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

app.directive('zddzInStock', () => {

  let redTape = (element) => {
    let soldOutEl = angular.element('<div am-Sold-Out> </div>');

    element.append(soldOutEl);

    let soldOutElWidth = soldOutEl.width();

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
        'left': `${(width /2) - (Math.floor(soldOutElWidth / 2)) }px`
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




app.controller('CartToggleCtrl', function ($scope, ShopifyApi) {
  let updateCount = () => {
    return ShopifyApi.getCart().then((resp) => {
      this.itemCount =  resp.data.item_count;
    });
  }

  updateCount();

});

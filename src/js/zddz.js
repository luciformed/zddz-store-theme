// import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";
// import glitch from "./glitch.js";
import angular from "../../bower_components/angular/index.js";
import ngAnimate from "../../bower_components/angular-animate/index.js";

import {
  tryCatch
} from "../../bower_components/ramda/dist/ramda.js";
import {
  Observable
} from "../../bower_components/rxjs/dist/rx.all.js";

import shopify from './shopify-api.js';

import productCtrl from "./product.controller.js";
import Cart from "./cart.service.js";
import cartDirective from "./cart.directive.js";
import glitchImgDirective from "./glitch-img.directive.js";

import templates from "./zddz.templates.js";

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const log = console.debug.bind(console);


$(document).ready(() => {
  /*TODO:*/
  // let DZ = $('[am-DZ]');

  // let order = getRandomIntInclusive(5, 7);

  // DZ.attr('am-Flex-Item', `order:${order}`);

  /*TODO:TMP DEV!*/

  setTimeout(() => {
    $('.shopify-preview-bar').hide();
  }, 3000);

});



let app = angular.module('zddz', ['ngAnimate', 'zddz.templates', shopify.name]).config(['$interpolateProvider', ($interpolateProvider) => {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
}]).run(($http) => {});

app.factory('Cart', Cart);
app.directive('zddzCart', cartDirective);
app.directive('zddzGlitchImg', glitchImgDirective);
app.controller('ProductCtrl', productCtrl);

app.filter('money', () => {
  return (price) => Shopify.formatMoney(price, Shopify.money_format);
});

app.filter('zddzSize', () => {
  return (sizeName = "-") => {
    return {
      "X-Small": "XS",
      "Small": "S",
      "Medium": "M",
      "Large": "L"
    }[sizeName] || sizeName;
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

app.directive('zoomImg', [() => {

  return {
    link(scope, element, attrs) {

      const ZOOM_OPTS = {
        zoomType: "inner",
        cursor: "crosshair"
      };

      /*this jquery plugin is a piece of shit*/
      /*it will actually pollute the DOM with its garbage */

      let elev;

      attrs.$observe('src', (val) => {

        if (!elev) {
          element.elevateZoom(ZOOM_OPTS);
          elev = element.data("elevateZoom");
        }
        elev.init(ZOOM_OPTS, element[0]);
      });

    }
  };

}])


app.controller('CartToggleCtrl', function($scope, Cart) {

  this.getItemCount = () => Cart.item_count;

  this.toggle = Cart.toggle;

});


app.controller('SettingsCtrl', function($scope, $data) {

  // console.log('settingsCtrl', $data);

  let previousIndex = Number(window.localStorage.getItem('DZIDX')) || null;

  const getNewIndex = (a, b) => {
    let res;
    if (b - a > 0 && previousIndex) {
      res = previousIndex;

      while (res == previousIndex) {
        res = getRandomIntInclusive(a, b);
      }

    } else {
      res = getRandomIntInclusive(a, b);
    }

    return res;

  };



  // log({
  //   previousIndex
  // });

  $scope.$settings = $data;

  let start = 5;
  let end = 7;






  let adjustedStart = start + ($data.show_large_section && $data.show_medium_section);

  // log({
  //   adjustedStart,
  //   end
  // });


  let order = getNewIndex(adjustedStart, end);

  window.localStorage.setItem("DZIDX", order);

  // log({
  //   order
  // });

  let adjust = ($data.show_large_section * 3) + ($data.show_medium_section * 2) + ($data.show_small_section * 1);


  this.getDZOrder = () => {
    return order;
  };

  this.getOrderForCollectionItem = index => {
    /*liquid index starts at 1? ...*/

    return adjust + index;
  };

});

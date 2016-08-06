import glitchCanvas from "../../bower_components/glitch-canvas/dist/glitch-canvas.js";
import glitch from "./glitch.js";
import angular from "../../bower_components/angular/index.js";;
import R from "../../bower_components/ramda/dist/ramda.js";

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
}]).run(() => {
  console.log('ZDDZ APP');
});

app.filter('zddzSize', () => {
  return (sizeName) => {
    console.log({sizeName});
    return {
      "X-Small" : "XS",
      "Small" : "S",
      "Medium" : "M",
      "Large" : "L"
    }[sizeName];
  };
});

app.controller('ProductCtrl', function ($scope, $data) {
  console.log('productctrl', this, $scope, $data);
  window.productctrl = this;

});


app.directive('zddzCtrl', ($controller) => {

  return {
    restrict: "A",
    link(scope, element, attrs) {

      let data = R.tryCatch(() => JSON.parse(attrs.zddzData.replace(/`/g, '"')), () => ({}))();

      let ctrl = $controller(attrs.zddzCtrl, {
        $scope : scope,
        $data : data
      });
      console.log('attrs.data', data);

      // ctrl.$data = attrs.zddzData;
    }
  };
});

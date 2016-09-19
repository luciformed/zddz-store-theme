export default angular.module('zddz.shopify-api', [])
  .factory('ShopifyApi', ($http) => {
    return {
      getCart: () => {
        return $http.get('/cart.js');
      },
      addToCart: (data) => {
        return $http.post('/cart/add.js', data);
      },
      updateItemsInCart: (data) => {
        return $http.post('/cart/update.js', data);
      }
    }
  });

export default function zddzCartDirective(Cart) {
  return {
    restrict: 'E',
    replace:true,
    templateUrl: 'templates/cart.html',
    controller: function zddzCartDirectiveCtrl($scope) {
      this.cart = Cart;

      this.getSubtotal = () => {
        return Cart.total_price;
      };

      this.removeItem = () => {

      };

      this.addItem = () => {

      };

      this.canAddMoreItems = () => true;

    },
    controllerAs: 'cartCtrl',
    require: 'zddzCart',
    link(scope, element, attrs, cartCtrl) {

    }
  }
};

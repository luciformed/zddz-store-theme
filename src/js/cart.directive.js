export default function zddzCartDirective(Cart) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/cart.html',
    controller: function zddzCartDirectiveCtrl($scope) {
      this.cart = Cart;

      this.getSubtotal = () => {
        return Cart.total_price;
      };

      this.removeItem = (item) => {
        return Cart.updateCartItem(angular.extend(item, {
          quantity: Math.max(0, item.quantity - 1)
        }));

      };

      this.addItem = (item) => {
        return Cart.updateCartItem(angular.extend(item, {
          quantity: item.quantity + 1
        }));
      };

      this.canAddMoreItems = () => true;

    },
    controllerAs: 'cartCtrl',
    require: 'zddzCart',
    link(scope, element, attrs, cartCtrl) {

    }
  }
};

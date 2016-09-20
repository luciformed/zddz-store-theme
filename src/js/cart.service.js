export default function(ShopifyApi) {

  let Cart = {};

  let updateCart = () => {
    return ShopifyApi.getCart().then((resp) => {

      angular.extend(Cart, resp.data);

      console.debug(Cart);
    });
  }

  Cart.isOpened = false;

  Cart.add = (productVariant) => {
    return ShopifyApi.addToCart(productVariant).then(updateCart);
  };

  Cart.updateCartItem = (cartItem) => {
    return ShopifyApi.updateItemsInCart({
      updates : {
        [cartItem.id] : cartItem.quantity
      }
    }).then(updateCart);
  };

  // Cart.remove = (cartItem) => {
  //   return ShopifyApi.updateItemsInCart({
  //     id: cartItem.id,
  //     quantity: cartItem.quantity - 1
  //   }).then(updateCart);
  // };

  Cart.open = () => Cart.isOpened = true;
  Cart.close = () => Cart.isOpened = false;
  Cart.toggle = () => Cart.isOpened = !Cart.isOpened;

  updateCart();

  return Cart;
};

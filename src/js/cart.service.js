export default function(ShopifyApi) {

  let Cart = {};

  let updateCart = () => {
    return ShopifyApi.getCart().then((resp) => {

      angular.extend(Cart, resp.data);

      console.debug(Cart);
      // this.itemCount = resp.data.item_count;
    });
  }

  Cart.isOpened = false;

  Cart.add = (productVariant) => {
    return ShopifyApi.addToCart(productVariant).then(updateCart);
  };

  Cart.remove = (cartItem) => {
    return Shopify.updateCart({
      id: cartItem.id,
      quantity: cartItem.quantity - 1
    }).then(updateCart);
  };

  Cart.open = () => Cart.isOpened = true;
  Cart.close = () => Cart.isOpened = false;
  Cart.toggle = () => Cart.isOpened = !Cart.isOpened;

  updateCart();

  return Cart;
};

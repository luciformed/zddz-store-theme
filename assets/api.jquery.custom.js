Shopify.updateCartInfo = function(cart, cart_summary_id, cart_count_id) {
	if ((typeof cart_summary_id) === 'string') {
		var cart_summary = jQuery('#' + cart_summary_id);
		if (cart_summary.length) {
			// Start from scratch.
			cart_summary.empty();
			// Pull it all out.
          	
			jQuery.each(cart, function(key, value) {
				if (key === 'items') {
					
					if (value.length) {
                      	jQuery('<div class="items"></div>').appendTo(cart_summary);
						var table = jQuery('#' + cart_summary_id + ' div.items');
                      
						jQuery.each(value, function(i, item) {						
							jQuery('<div class="td_thumb clearfix"><div class="cleft"><a class="td_close" title="Remove" href="javascript:void(0);" onclick="Shopify.removeItem(' + item.variant_id + ')"></a><a class="td_link" href="' + item.url + '"><img src="' + item.image + '" alt="" title=""/></a></div><div class="cright"><div class="name"><a href="' + item.url + '">' + item.title + '</a></div><div class="cprice"><span class="money">' + Shopify.formatMoney(item.price) + '</span><strong> x ' + item.quantity + '</strong></div></div></div>').appendTo(table);
						});
						
						jQuery('<div class="tr_total clearfix"><div class="cleft"><span class="cart-total">Total</span></div><div class="cright align-right"><span class="money">' + Shopify.formatMoney(cart.total_price) + '</span></div></div>').appendTo(table);
						
						jQuery('<div class="tr_checkout"><div class="checkout"><input class="remove_display" type="submit" value="Checkout" onclick="window.location=\'/checkout\'"></input></div><div class="tr_viewcart"><div class="viewcart">or <a href="/cart">View Cart</a></div></div></div>').appendTo(table);
					}
					else {
						jQuery('<div class="empty"><em>Your shopping cart is empty. Check out our <a href="/collections/all"><strong>Catalog</strong></a> to see what\'s available.</em></div>').appendTo(cart_summary);
					}
				}
			});
			
			
		}
	}
	// Update cart count.
	if ((typeof cart_count_id) === 'string') {
		if (cart.item_count == 0) { 
			jQuery('#' + cart_count_id).html('your cart is empty'); 
		}
		else if (cart.item_count == 1) {
			jQuery('#' + cart_count_id).html('1 item in your cart');
		}
		else {
			jQuery('#' + cart_count_id).html(cart.item_count + ' items in your cart');
		}
	}
  
  /* Update cart info */
  updateCartDesc(cart);
  
  /* Update currency */
  jQuery('[name=currencies]').change();
};

Shopify.onCartUpdate = function(cart) {
	Shopify.updateCartInfo(cart, 'cart-info', 'shopping-cart');
};

jQuery(function() {
	
	// Let's get the cart and show what's in it in the cart box.	
	Shopify.getCart(function(cart) {
      
		Shopify.updateCartInfo(cart, 'cart-info');		
	});

});
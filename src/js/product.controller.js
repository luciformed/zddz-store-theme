export default function ProductCtrl($scope, $data, ZDDZShopify) {
  console.debug('productctrlnew', this, $scope, $data);


  let product = this.product = $data;

  this.showSizes = true;

  if (product.variants.length == 1 && product.variants[0].title.indexOf('Default') != -1) {
    this.showSizes = false;
  }

  if (product.available) {
    this.selectedVariant = product.variants.filter((v) => v.available)[0];
  }


  this.canAddToCart = () => {
    return product.available && !!this.selectedVariant;
  };

  this.addToCart = () => {
    if (!this.selectedVariant) {
      return;
    }

    return ZDDZShopify.addToCart({
      quantity: 1,
      id: this.selectedVariant.id
    })
  };

};



var test = {
  "id": 5781972485,
  "title": "Choker F-Dress",
  "handle": "choker-f-dress",
  "description": "<p><strong>Composition:</strong> 100% Cotton</p>",
  "published_at": "2016-06-15T13:56:00+02:00",
  "created_at": "2016-06-15T13:57:06+02:00",
  "vendor": "ZDDZ Shop",
  "type": "Dresses",
  "tags": [],
  "price": 9500,
  "price_min": 9500,
  "price_max": 9500,
  "available": true,
  "price_varies": false,
  "compare_at_price": 19000,
  "compare_at_price_min": 19000,
  "compare_at_price_max": 19000,
  "compare_at_price_varies": false,
  "variants": [{
    "id": 18330718853,
    "title": "X-Small",
    "option1": "X-Small",
    "option2": null,
    "option3": null,
    "sku": "",
    "requires_shipping": true,
    "taxable": true,
    "featured_image": null,
    "available": true,
    "name": "Choker F-Dress - X-Small",
    "public_title": "X-Small",
    "options": ["X-Small"],
    "price": 9500,
    "weight": 560,
    "compare_at_price": 19000,
    "inventory_quantity": 3,
    "inventory_management": "shopify",
    "inventory_policy": "deny",
    "barcode": ""
  }, {
    "id": 18681806917,
    "title": "Small",
    "option1": "Small",
    "option2": null,
    "option3": null,
    "sku": "",
    "requires_shipping": true,
    "taxable": true,
    "featured_image": null,
    "available": true,
    "name": "Choker F-Dress - Small",
    "public_title": "Small",
    "options": ["Small"],
    "price": 9500,
    "weight": 560,
    "compare_at_price": 19000,
    "inventory_quantity": 3,
    "inventory_management": "shopify",
    "inventory_policy": "deny",
    "barcode": ""
  }, {
    "id": 18681807045,
    "title": "Medium",
    "option1": "Medium",
    "option2": null,
    "option3": null,
    "sku": "",
    "requires_shipping": true,
    "taxable": true,
    "featured_image": null,
    "available": true,
    "name": "Choker F-Dress - Medium",
    "public_title": "Medium",
    "options": ["Medium"],
    "price": 9500,
    "weight": 560,
    "compare_at_price": 19000,
    "inventory_quantity": 1,
    "inventory_management": "shopify",
    "inventory_policy": "deny",
    "barcode": ""
  }, {
    "id": 18681807173,
    "title": "Large",
    "option1": "Large",
    "option2": null,
    "option3": null,
    "sku": "",
    "requires_shipping": true,
    "taxable": true,
    "featured_image": null,
    "available": true,
    "name": "Choker F-Dress - Large",
    "public_title": "Large",
    "options": ["Large"],
    "price": 9500,
    "weight": 560,
    "compare_at_price": 19000,
    "inventory_quantity": 1,
    "inventory_management": "shopify",
    "inventory_policy": "deny",
    "barcode": ""
  }],
  "images": ["//cdn.shopify.com/s/files/1/0274/0369/products/image-chocker-f-sweatshirt-dress-1.jpg?v=1465991828", "//cdn.shopify.com/s/files/1/0274/0369/products/image-chocker-f-sweatshirt-dress-2.jpg?v=1465991830", "//cdn.shopify.com/s/files/1/0274/0369/products/image-chocker-f-sweatshirt-dress-3.jpg?v=1465991832", "//cdn.shopify.com/s/files/1/0274/0369/products/image-chocker-f-sweatshirt-dress-4.jpg?v=1465991833"],
  "featured_image": "//cdn.shopify.com/s/files/1/0274/0369/products/image-chocker-f-sweatshirt-dress-1.jpg?v=1465991828",
  "options": ["Size"],
  "content": "<p><strong>Composition:</strong> 100% Cotton</p>"
}

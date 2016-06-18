/**
 * Radiance Theme JS
 *
 * Dependencies:
 * - hoverintent.jquery.js
 *
 */



/**
 * Look under your chair! console.log FOR EVERYONE!
 *
 * @see http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
 */
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



/**
 * Page-specific call-backs
 * Called after dom has loaded.
 */
var RADIANCE = {

  common : {
    init: function(){
      $('html').removeClass('no-js').addClass('js');
      setupDropdownMenus();
      searchPlaceholder();

      $('.nav-arrow', '#top-menu').each( function(){
        $(this).css('top', Math.ceil($(this).parent(2).height()/2) + 1);
      });

      $('.add-to-carts').bind( 'click', addToCart );
    }
  },

  templateIndex : {
    init: function(){
      
    }
  },

  templateProduct : {
    init: function(){
      
    }
  },

  templateCart : {
    init: function(){
      
    }
  }

}

$(function() {
  $('.add-to-carts').bind('touchstart', addToCart);
});


/**
 * Fire function based upon attributes on the body tag.
 * This is the reason for "template{{ template | camelize }}" in layout/theme.liquid
 *
 * @see http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/
 */
var UTIL = {

  fire : function(func,funcname, args){
    var namespace = RADIANCE;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
      namespace[func][funcname](args);
    }
  },

  loadEvents : function(){
    var bodyId = document.body.id;

    // hit up common first.
    UTIL.fire('common');

    // do all the classes too.
    $.each(document.body.className.split(/\s+/),function(i,classnm){
      UTIL.fire(classnm);
      UTIL.fire(classnm,bodyId);
    });
  }

};
$(document).ready(UTIL.loadEvents);



/**
 * Balances the height of rows of products/collections.
 * Finds the tallest item in a row, makes each <li> in that row as tall as the tallest.
 */
$.fn.balanceRowHeight = function(numPerRow) {
  var nPerRow = numPerRow || 4;
  var nItems = $(this).find('li').length;
  var nRows = Math.round( nItems / nPerRow );

  for( var row = 1; row <= nRows; row++ ){
    var min = row * nPerRow - nPerRow;
    var max = row * nPerRow;
    var tallestInRow = 0;
    var tallestTitleInRow = 0;

    $(this).find('li').slice(min, max).each(function(){
      if( $(this).height() > tallestInRow ){
        tallestInRow = $(this).height();
      }
      if( $(this).find('.product-information:first').height() > tallestTitleInRow ){
        tallestTitleInRow = $(this).find('.product-information').height();
      }
    }).height(tallestInRow).addClass('generated-height');
  }

  return this;
};

/**
 * Balance product grid height after all images have loaded.
 */
$(window).load( function(){
  
});



/**
 * Support for dropdown menus
 */
function setupDropdownMenus(){
  $('#top-menu .has-dropdown').hoverIntent( navRollOver, navRollOut );

  function navRollOver(e){
    $(this).addClass('active').find('ul:first').css('top', $(this).height()).show();
  }
  function navRollOut(e){
    $(this).removeClass('active').find('ul:first').hide();
  }

}


/**
 * Popup notify add-to-cart
 */
function notifyProduct($info){
  var wait = setTimeout(function(){
    $.jGrowl($info,{life: 5000000});	
  },1000);
}


/**
 * Ajaxy add-to-cart
 */
function addToCart(e){

  if (typeof e !== 'undefined') e.preventDefault();

  var form      = $(this).parents('form');
  
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    async: false,
    data: form.serialize(),
    dataType: 'json',
    error: addToCartFail,
    success: addToCartSuccess,
    cache: false
  });
  
  var thumbnail = form.parents('.thumbnail-fly').find('.thumbnail').find('img').first();
  
  if(thumbnail.attr('src')) {
  	flyToCart(thumbnail);
  }
  else {
    thumbnail = form.parents('#product-information').parent().find('#product_flex').find('.slides .active').find('img').first();
    if(thumbnail.attr('src')) {
      flyToCart(thumbnail);
    }
  }
  
  $.fancybox.close();
}

function addToCartSuccess (jqXHR, textStatus, errorThrown){

  $.ajax({
    type: 'GET',
    url: '/cart.js',
    async: false,
    cache: false,
    dataType: 'json',
    success: updateCartDesc
  });

  var $info = '<div class="grid-container remove_padding"><a href="'+ jqXHR['url'] +'" class="grid-30 mobile-grid-30 tablet-grid-30 product_img_link remove_padding"><img width="65" src="'+ jqXHR['image'] +'" alt="'+ jqXHR['title'] +'"/></a><div class="grid-70 mobile-grid-70 tablet-grid-70 prod-title remove_padding"><a href="'+ jqXHR['url'] +'">'+ jqXHR['title'] +'</a> <div class="cart-megs">has been successfully added to <a href="/cart" class="your_cart">Your Cart</a></div></div></div>';
  notifyProduct($info)
  ;

  // Let's get the cart and show what's in it in the cart box.	
  Shopify.getCart(function(cart) {
    Shopify.updateCartInfo(cart, 'cart-info');		
  });
}

function flyToCart(imgobj){
  
  if(imgobj){
    var imgsrc = imgobj.attr('src');

    imgobj.animate_from_to('#umbrella .cart-link', {
      pixels_per_second: 700, 
      initial_css: {
        'image': imgsrc
      },
      callback: function(){
      }
    });
  }
}

function addToCartFail(jqXHR, textStatus, errorThrown){
  var response = $.parseJSON(jqXHR.responseText);
  
  var $info = '<div class="error">'+ response.description +'</div>';
  notifyProduct($info);
}

function updateCartDesc(data){
  var $cartLinkText = $('.cart-link .number:first');

  switch(data.item_count){
    case 0:
      $cartLinkText.text('0');
      break;
    case 1:
      $cartLinkText.text('1');
      break;
    default:
      $cartLinkText.text(data.item_count);
      break;
  }
}



/**
 * Enable placeholder switcheroo in older browsers.
 * @see http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text
 */
function searchPlaceholder(){

  if(!Modernizr.input.placeholder){
    $('#top-search-input').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
      })
    });
  }
}

/* button showmore */

function showmore() {
  var $collectionListing1 = document.getElementById("collectionListing1"); 
  if ($collectionListing1.style.display == 'none') 
    $collectionListing1.style.display = ''; 
  var $showmore = document.getElementById("showmore"); 
  $showmore.style.display = 'none';
  return ;
}
function showmoreht() {
  var $tab1col1 = document.getElementById("tab1col1");
  var $tab2col2 = document.getElementById("tab2col2");
  var $tab3col3 = document.getElementById("tab3col3");
  if ($tab1col1.style.display == 'none'){
    $tab1col1.style.display = '';
    var $showmoreht1 = document.getElementById("showmoreht1");
    $showmoreht1.style.display = 'none';
  }
  else if ($tab2col2.style.display == 'none'){
    $tab2col2.style.display = '';
    var $showmoreht2 = document.getElementById("showmoreht2");
    $showmoreht2.style.display = 'none';
  }
    else{
      $tab3col3.style.display = '';
      var $showmoreht3 = document.getElementById("showmoreht3");
      $showmoreht3.style.display = 'none';
    }
  return ;
}

/*update product main image*/

jQuery(document).ready(function($) {
  $('.product-image').on('touchstart', '.thumb-zoom', function() {
    var child = $(this).find('img');
    
    var src_display = child.attr('data-src-display');
    
    $('.thumb-zoom').removeClass('active');
    $(this).addClass('active');
    
    $('.main-image').find('img').attr('src', src_display);
  }).on('hover', '.thumb-zoom', function() {
    var child = $(this).find('img');
    
    var src_display = child.attr('data-src-display');
    
    $('.thumb-zoom').removeClass('active');
    $(this).addClass('active');
    
    $('.main-image').find('img').attr('src', src_display);
  })
})

var pInfScrLoading = false;
var pInfScrDelay = 250;
function pInfScrExecute() {
	pInfScrNode = $('.more').last();	
	pInfScrURL = $('.more a').last().attr("href");
	if(pInfScrNode.length > 0 && pInfScrNode.css('display') != 'none') {
		$.ajax({
			type: 'GET',
			url: pInfScrURL,
			beforeSend: function() {
			  pInfScrLoading = true;
			  pInfScrNode.clone().empty().insertAfter(pInfScrNode).append('<img src=\"http://cdn.shopify.com/s/files/1/0068/2162/assets/loader.gif?105791\" />');
			  pInfScrNode.hide();
			},
			success: function(data) {
				// remove loading feedback
				pInfScrNode.next().remove();
				pInfScrNode.remove();
				var filteredData = $(data).find(".collection-matrix");
				filteredData.insertBefore( $("#product-list-foot") );					
				pInfScrLoading = false;
				$('li.singleproduct').setAllToMaxHeight();
				attachClickEvent();
			},
			dataType: "html"
		});
 
	}
}
 
function attachClickEvent(){
	$('li.more a').click(function(event){
		pInfScrExecute();
		event.stopPropagation();
		return false;
	});
}

$(function(){
var $logoImg = $('#site-title a img');
if($logoImg.css('min-height') == '1px') {
$logoImg.attr('src', $logoImg.attr('src').replace('logo.png', 'logo@2x.png'));
}
});
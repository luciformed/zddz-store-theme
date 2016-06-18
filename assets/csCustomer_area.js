
/* customer address helper */
Shopify.CustomerAddress = {
  toggleForm: function(id) {
    var editEl = document.getElementById('edit_address_'+id);
    var toolEl = document.getElementById('tool_address_'+id);      
    editEl.style.display = editEl.style.display == 'none' ? '' : 'none';
    toolEl.style.visibility = toolEl.style.visibility == 'hidden' ? '' : 'hidden';
    return false;    
  },
  
  toggleNewForm: function() {
    var el = document.getElementById('add_address');
    el.style.display = el.style.display == 'none' ? '' : 'none';
    return false;
  },
  
  destroy: function(id, confirm_msg) {
    if (confirm(confirm_msg || "Are you sure you wish to delete this address?")) {
      Shopify.postLink('/account/addresses/'+id, {'parameters': {'_method': 'delete'}});
    }      
  }
}

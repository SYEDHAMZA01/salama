// Find all the select elements and loop through them
$('select').each(function(){
    // Cache the jQuery select object and get the number of options
    var $this = $(this), selectOptions = $(this).children('option').length;
  
    // Hide the original select element and wrap it with a div with class 'select'
    $this.addClass('hide-select'); 
    $this.wrap('<div class="select"></div>');
  
    // Add a div with class 'form-select' after the original select element
    $this.after('<div class="form-select"></div>');
  
    // Cache the newly created form-select element and set its text to the text of the first option
    var $customSelect = $this.next('div.form-select');
    $customSelect.text($this.children('option').eq(0).text());
  
    // Create a new unordered list element with class 'dropdown-menu' and insert it after the form-select element
    var $optionlist = $('<ul />', {
        'class': 'dropdown-menu'
    }).insertAfter($customSelect);
  
    // Loop through all the options and create a new list item element for each option
    for (var i = 0; i < selectOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($optionlist);
    }
  
    // Cache all the list items and add a click event to the form-select element
    var $optionlistItems = $optionlist.children('li');
    $customSelect.click(function(e) {
        e.stopPropagation();
        
        // Remove the 'active' class and hide the option list for all other form-select elements except the current one
        $('div.form-select.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.dropdown-menu').hide();
        });
        
        // Toggle the 'active' class and slide toggle the option list for the current form-select element
        $(this).toggleClass('active').next('ul.dropdown-menu').slideToggle();
    });
  
    // Add a click event to all the list items
    $optionlistItems.click(function(e) {
        e.stopPropagation();
        
        // Set the text of the form-select element to the text of the clicked list item and remove the 'active' class
        $customSelect.text($(this).text()).removeClass('active');
        
        // Set the value of the original select element to the 'rel' attribute of the clicked list item
        $this.val($(this).attr('rel'));
        
        // Hide the option list
        $optionlist.hide();
    });

    $optionlistItems.click(function(e) {
        e.stopPropagation();
        
        // Remove the 'active-option' class from all list items and add it to the clicked list item
        $optionlistItems.removeClass('active-option');
        $(this).addClass('active-option');
        
        // Set the text of the form-select element to the text of the clicked list item and remove the 'active' class
        $customSelect.text($(this).text()).removeClass('active');
        
        // Set the value of the original select element to the 'rel' attribute of the clicked list item
        $this.val($(this).attr('rel'));
        
        // Hide the option list
        $optionlist.hide();
    });
    
  
    // Add a click event to the document to remove the 'active' class and hide the option list for all form-select elements
    $(document).click(function() {
        $customSelect.removeClass('active');
        $optionlist.hide();
    });
});

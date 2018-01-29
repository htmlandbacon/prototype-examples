
function removeEmptyItems(items) {
    items.each(function( index ) {
        if (index > 0 && $(this).find('input').val() === '') {
            $(this).addClass('js-hidden');
        }
    });
}

function injectLink() {
  if ($('.form-group.js-hidden').length !== 0) {
    $('#add-button').append('<div class="form-group"><a href="#" id="action-add-a-thing" class="button button-add" role="button">+ Add a thing</a></div>');
  }
}

function showNextAndFocus() {
    var next = $('.form-group.js-hidden:first');
    next.removeClass('js-hidden');
    next.find('input').focus();
    
    next.append('<div><a href="#" id="action-remove-a-thing" data-group="' + next.attr('id') + '" role="button">- Remove</a></div>')
}

function checkMaxAndRemoveLink() {
if ($('.form-group.js-hidden').length === 0) {
    $('#add-button').addClass('js-hidden');
  }
}

function removeItem(element) {
    $('#' + $(element).data('group')).addClass('js-hidden');
    $(element).parent('div').remove();
}

$(document).ready(function () {

    var items = $('.js-list > .form-group');
    // loop over items of js list and hide any empty ones
    removeEmptyItems(items);
    injectLink();


     $(document).on('click touchend', function (e) {
        // add thing
        if (e.target.id === 'action-add-a-thing') {
        e.preventDefault();
        showNextAndFocus();
        checkMaxAndRemoveLink();
        return false;
        }

        // remove a thing
        if (e.target.id === 'action-remove-a-thing') {
        removeItem(e.target);
        return false;
        }
  });
    
});
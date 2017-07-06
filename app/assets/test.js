var maxCountries = 3;

var url = window.location.pathname;

function countryCheckHasRemoveLink(element) {
  if ($(element).find('a').length === 0) {
    addRemoveCountryLink(element);
  }
}

function countryAddLink() {
  if ($('.country-wrapper.js-hidden').length !== 0) {
    if ($('#show-country').length === 0) {
      $('#add-country').append('<a href="#" id="show-country">Add another country</a>');
    }
  }
}

function countryCheckRemoveLinks() {
  if ($('div.country-wrapper:not(".js-hidden")').length !== 1) {
    $('div.country-wrapper:not(".js-hidden") label').each(function () {
      addRemoveCountryLink(this);
    });
  }
}

function countryShowNext() {
  GOVUK.performance.sendGoogleAnalyticsEvent(url, 'link', 'add-country');
  addRemoveCountryLink($('.country-wrapper.js-hidden:first label'));
  $('.country-wrapper.js-hidden:first').removeClass('js-hidden');
}

function countryCheckMin() {
  if ($('.country-wrapper.js-hidden').length === maxCountries) {
    $('div[id="country-name[0]-form"] label a').remove();
  }
}
function countryReorderList(blockID) {
  var countryIndex = 0;
  if (blockID !== undefined) {
    countryIndex = $('div[id="' + blockID + '"]').data('index');
  }
  $('select.form-control option:selected').each(function (index) {
    if (index > countryIndex) {
      var prevIndex = (index - 1);
      $('div[id="country-name[' + prevIndex + ']-form"] input').val($(this).text());
      $('div[id="country-name[' + prevIndex + ']-form"]').removeClass('error');
      $('select[id="country-name[' + prevIndex + ']"]').val($(this).text()).change();
    }
  });
}

function removeCountry(element) {
  GOVUK.performance.sendGoogleAnalyticsEvent(url, 'link', 'remove-country');
  // if remove is last element them hide
  var blockID = $(element).parent().parent().parent().attr('id');
  var lastElementID = $('div.country-wrapper:not(".js-hidden")').last().attr('id');
  if (blockID === lastElementID) {
    resetValueLast();
    $('div[id="' + blockID + '"]').addClass('js-hidden');
  } else {
    countryReorderList(blockID);
    resetValueLast();
    $('div[id="' + lastElementID + '"]').addClass('js-hidden');
  }
  $('.js-error div').remove();
  // else switch around elements
  countryCheckMin();
  countryAddLink();
}

function addRemoveCountryLink(element) {
  if ($(element).find('a').length === 0) {
    $(element).append(' <a href="#" id="remove-link" class="remove-link">Remove</a>');
  }
}

function countryCheckMax() {
  if ($('.country-wrapper.js-hidden').length === 0) {
    $('#show-country').remove();
  }
}

function resetValueLast() {
  $('div.country-wrapper:not(".js-hidden") div').removeClass('error');
  $('div.country-wrapper:not(".js-hidden") .error-message').remove();
  $('div.country-wrapper:not(".js-hidden") input').last().val('');
  $('div.country-wrapper:not(".js-hidden") select option:selected').last().attr('selected', false);
}

function validateEmpty(e) {
  var invalid = 0;
  var errorMessage = ['Check you have entered a valid country', 'Enter or select a country'];
  $('.country-wrapper:not(".js-hidden") input').each(function (index) {
    $('div[id="country-name[' + index + ']-form"] span.error-message').remove();
    if ($(this).val() === '') {
      invalid++;
      $('<span class="error-message">' + errorMessage[1] + '</span>').insertAfter('div[id="country-name[' + index + ']-form"] label');
      $('div[id="country-name[' + index + ']-form"]').addClass('error');
    } else {
      $('div[id="country-name[' + index + ']-form"]').removeClass('error');
    }
  });
  if (invalid === 0) {
    validateDuplicates(e);
  } else {
    e.preventDefault();
    GOVUK.performance.sendGoogleAnalyticsEvent(url, 'error', 'country-name');
    $('.js-error').html('<div class="form-group error" id="error-message" role="alert"><span class="form-label-bold">' + errorMessage[0] + '</span><span class="error-message">' + errorMessage[1] + '</span></div>');
  }
}

function validateDuplicates(e) {
  var invalid = 0;
  var countries = [];
  var errorMessage = ['Check you have not entered duplicate countries', 'Only enter or select each country once'];
  $('.country-wrapper:not(".js-hidden") input').each(function (index) {
    $('div[id="country-name[' + index + ']-form"] span.error-message').remove();
    if ($.inArray($(this).val(), countries) >= 0) {
      invalid++;
      $('div[id="country-name[' + index + ']-form"]').addClass('error');
      $('<span class="error-message">' + errorMessage[1] + '</span>').insertAfter('div[id="country-name[' + index + ']-form"] label');
    } else {
      $('div[id="country-name[' + index + ']-form"]').removeClass('error');
    }
    countries.push($(this).val());
  });
  if (invalid !== 0) {
    e.preventDefault();
    GOVUK.performance.sendGoogleAnalyticsEvent(url, 'error', 'country-name');
    errorMessage[1] = 'Only enter or select each country once';
    $('.js-error').html('<div class="form-group error" id="error-message" role="alert"><span class="form-label-bold">' + errorMessage[0] + '</span><span class="error-message">' + errorMessage[1] + '</span></div>');
  }
}

function countryEvent() {
  GOVUK.performance.sendGoogleAnalyticsEvent(url, 'clicked-box', 'country-name');
}

function countrySetup() {
  countryAddLink();
  countryCheckRemoveLinks();
}

$(window).load(function () {
  $('select').selectToAutocomplete();
  countrySetup();
  $(document).on('click touchend', function (e) {
    // add country
    if (e.target.id === 'show-country') {
      e.preventDefault();
      countryCheckHasRemoveLink($('div[id="country-name[0]-form"] label'));
      countryShowNext();
      countryCheckMax();
      return false;
    }

    // remove country
    if (e.target.id === 'remove-link') {
      removeCountry(e.target);
      return false;
    }

    // validate page
    if (e.target.id === 'form-submit') {
      validateEmpty(e);
    }
  });
});

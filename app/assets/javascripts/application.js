/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

$(document).ready(function () {

  // service nav
  $(".js-step-title-button").click(function(event) {
    if($(event.target).parent().parent().find('span').text() === "Show") {
      $(event.target).parent().parent().find('span').text("Hide");
    } else {
      $(event.target).parent().parent().find('span').text("Show");
    }
    $(event.target).parent().parent().next('.js-panel').toggleClass('js-hidden');
  });

  $( ".js-toggle-link" ).click(function(event) {
    if($(event.target).text() === "Show") {
      $(event.target).text("Hide");
    } else {
      $(event.target).text("Show");
    }
    $(event.target).parent().next('.js-panel').toggleClass('js-hidden');
  });
  
  $(".js-step-controls-button").click(function(event) {
    if($(event.target).text() === "Show all") {
      $(event.target).text("Hide all") 
      $('.js-toggle-link').text("Hide");
      $('.js-panel').removeClass("js-hidden");
    } else {
      $(event.target).text("Show all") 
      $('.js-toggle-link').text("Show");
      $('.js-panel').addClass("js-hidden");
    }
  });


  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
})

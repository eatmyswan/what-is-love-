//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require jquery.remotipart
//= require swfobject
//= require lib/timemaster
//= require_directory ./lib
//= require_self
//= require_directory .

// Prevent the backspace key from navigating back.
$(document).keydown(function (e) {
  var doPrevent;

  if (e.keyCode == 8) {
    var d = e.srcElement || e.target
      , tagName = d.tagName.toUpperCase()
    ;
    if (tagName == 'INPUT' || tagName == 'TEXTAREA') {
      doPrevent = d.readOnly || d.disabled;
    }
    else doPrevent = true;
  }
  else doPrevent = false;

  if (doPrevent) e.preventDefault();
});

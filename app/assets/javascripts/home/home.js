//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require ../routes
//= require ../fancybox
//= require_directory .

$(document).ready(function () {
  $("#promo-bg2").hide();
  $('#rollbox')
    .mouseenter(function () {
      $('#promo-bg2').fadeToggle("slow");
      $('#promo-bg1').fadeToggle("slow");
    })
    .mouseleave(function () {
      $('#promo-bg2').fadeToggle("slow");
      $('#promo-bg1').fadeToggle("slow");
    })
  ;
});

$('[href="' + paths.newInvite() + '"]').live("mouseover", function () {
  if (!$(this).data("init")) {
    $(this).data("init", true);
    $(this).fancybox({
      overlayColor: '#000',
      overlayOpacity: 0.5,
      showCloseButton: false,
      autoDimensions: true,
      width: 'auto'
    });
  }
});

$('.new_invite').live('submit', function () {
  var dialog = $(this).parent();
  $(this).bind('ajax:success', function (e,resp) {
    dialog.html(resp);
    $.fancybox.center();
  });
  return true;
});

$('.close-fancybox').live('click', function () {
  $.fancybox.close();
});

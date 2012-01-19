//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require ../routes
//= require ../fancybox
//= require_directory .
(function () {
  var fancyboxOptions = {
    overlayColor: '#000',
    overlayOpacity: 0.5,
    showCloseButton: false,
    autoDimensions: true,
    width: 415
  };

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
      $(this).fancybox( $.extend({}, fancyboxOptions) );
    }
  });

  $('.new_invite').live('submit', function () {
    $(this).parent().addClass('loading');

    $(this).bind('ajax:success', function (e,resp) {
      if ( $('#fancybox-wrap').is(':visible') ) {
        $('#fancybox-wrap .dialog').replaceWith(resp);
        $.fancybox.center();
      }
      else {
        var options = $.extend({ content:resp }, fancyboxOptions);
        $.fancybox(options);
      }
    });
    return true;
  });

  $('.close-fancybox').live('click', function () {
    $.fancybox.close();
  });

  $('.temp').click(function () { alert('hi'); });


})();

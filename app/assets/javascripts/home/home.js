//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require ../routes
//= require fancybox_patched-for-landing
//= require_directory .

(function () {
  var fancyboxOptions = {
    overlayColor: '#000',
    overlayOpacity: 0.5,
    showCloseButton: false,
    autoDimensions: true,
    width: 415,
    transitionOut: 'none',
    changeFade: 0
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

  $(
    '[href="' + TM.path.newInvite() + '"],' +
    '[href="' + TM.path.ajaxLogin() + '"],' +
    '[href="' + TM.path.newUserSession() + '"]'
   )
  .live("mouseover", function () {
    if (!$(this).data("init")) {
      $(this).data("init", true).fancybox(fancyboxOptions);
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
        $.fancybox(resp, fancyboxOptions);
      }
    });
    return true;
  });

  // Sign in form. I'm suspicious about the generated class.
  $('.user_new').live('submit', function () {
    $(this).parent().addClass('loading');

    $(this).bind('ajax:success', function () {
      window.location = TM.path.root();
    })
    .bind('ajax:error', function () {
      $(this)
        .parent().removeClass('loading').end()
        .find('.errorExplanation').show('pulsate', { times:3 })
      ;
    })
    ;
  });

  $('.close-fancybox').live('click', function () {
    $.fancybox.close();
  });

  $('.temp').click(function () { alert('hi'); });


})();

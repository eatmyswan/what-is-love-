#= require fancybox_patched-for-landing

# NOTE: This module is intended only to be used when the
# user is not logged in. The dependencies for this file
# conflict with the files used in the real application.

fancyboxOptions =
  overlayColor: '#000'
  overlayOpacity: 0.5
  showCloseButton: false
  autoDimensions: true
  width: 415
  transitionOut: 'none'
  changeFade: 0

D = TM.Dialog =

  # The url to redirect to after a user signs in.
  redirectUrl: TM.path.root()
  # The url to display after a successful signin.
  # NOTE: Takes priority over redirectUrl
  signinSuccessUrl: undefined

  getFancyboxOptions: (options) -> $.extend {}, fancyboxOptions, options

  bindFancyboxUrl: (url) ->
    TM.bindFancybox "[href=\"#{url}\"]", D.getFancyboxOptions()

$(document).ready ->

  # Bind session and invite related urls
  TM.Dialog.bindFancyboxUrl( TM.path.ajaxLogin() );
  TM.Dialog.bindFancyboxUrl( TM.path.newUserSession() );
  TM.Dialog.bindFancyboxUrl( TM.path.newInvite() );

  # Bind ajax callbacks for sessions
  $(document).on 'submit', '.user_new', ->
    $(this).parent().addClass 'loading'

    $(this)
    .bind 'ajax:success', ->
      if D.signinSuccessUrl
        $.fancybox TM.Dialog.getFancyboxOptions { href:D.signinSuccessUrl }
      else
        window.location = D.redirectUrl
    .bind 'ajax:error', ->
      $(this).parent().removeClass('loading')
      $(this).find('.errorExplanation').show 'pulsate', times:3

  # Bind ajax callbacks for beta invites
  $(document).on 'submit', '.new_invite', ->
    $(this).parent().addClass 'loading'

    $(this).bind 'ajax:success', (e,resp) ->
      if $('#fancybox-wrap').is ':visible'
        $('#fancybox-wrap .dialog').replaceWith(resp)
        $.fancybox.center()
      else
        $.fancybox resp, TM.Dialog.getFancyboxOptions()
    return true

  # Bind session dialog closing.
  $(document).on 'click', '.close-fancybox', ->
    $.fancybox.close()

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
  getFancyboxOptions: -> $.extend {}, fancyboxOptions

  bindFancyboxUrl: (url) ->
    $(document).on 'mouseover', "[href=\"#{url}\"]", ->
      return if $(this).data 'init'
      $(this).data('init', true).fancybox D.getFancyboxOptions()

$(document).ready ->

  # Bind session-related urls
  TM.Dialog.bindFancyboxUrl( TM.path.ajaxLogin() );
  TM.Dialog.bindFancyboxUrl( TM.path.newUserSession() );

  # Bind ajax callbacks on session dialog submits.
  $(document).on 'submit', '.user_new', ->
    $(this).parent().addClass 'loading'

    $(this)
    .bind 'ajax:success', ->
      window.location = TM.path.root()
    .bind 'ajax:error', ->
      $(this).parent().removeClass('loading')
      $(this).find('.errorExplanation').show 'pulsate', times:3

  # Bind session dialog closing.
  $(document).on 'click', '.close-fancybox', ->
    $.fancybox.close()

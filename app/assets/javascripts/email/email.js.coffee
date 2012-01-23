#= require jquery
#= require jquery-ui
#= require jquery_ujs
#= require soundmanager2
#= require ../lib/dialog
#= require_directory .


$(document).ready ->
  TM.Dialog.signinSuccessUrl = TM.path.viewEmailAfterSignin()

  $('form').bind 'submit', ->
    if TM.sdata.userSignedIn == false
      $.fancybox TM.Dialog.getFancyboxOptions {
        href: TM.path.ajaxLogin()
      }
      # $('<a data-remote="true">').attr('href', TM.path.ajaxLogin())
    # Make sure user is signed in
    return TM.sdata.userSignedIn

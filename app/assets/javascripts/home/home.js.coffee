#= require jquery
#= require jquery-ui
#= require jquery_ujs
#= require ../lib/timemaster
#= require ../lib/dialog
#= require_directory .

$(document).ready ->
  $("#promo-bg2").hide()
  $('#rollbox')
  .mouseenter ->
    $('#promo-bg2').fadeToggle "slow"
    $('#promo-bg1').fadeToggle "slow"
  .mouseleave ->
    $('#promo-bg2').fadeToggle "slow"
    $('#promo-bg1').fadeToggle "slow"

TM.Dialog.bindFancyboxUrl( TM.path.newInvite() );

$(document).on 'submit', '.new_invite', ->
  $(this).parent().addClass 'loading'

  $(this).bind 'ajax:success', (e,resp) ->
    if $('#fancybox-wrap').is ':visible'
      $('#fancybox-wrap .dialog').replaceWith(resp)
      $.fancybox.center()
    else
      $.fancybox resp, TM.Dialog.getFancyboxOptions()
  return true

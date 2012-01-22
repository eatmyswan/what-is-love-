#= require jquery
#= require jquery-ui
#= require jquery_ujs
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

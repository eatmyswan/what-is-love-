
I = TM.Icons =
  updatePadIcon: (src) ->
    $('#pad #top .cover img').attr 'src', src

$(document).on 'click', '#edit_icon .cat-icon', ->
  $(this)
  .siblings('.active').removeClass('active').end()
  .addClass('active')
  $('#group_icon').val $(this).data('icon')

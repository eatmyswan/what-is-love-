
# Inner-file shorthand reference to TM.Notices
N = null
_5_mins = 5 * 60 * 1000

TM.Notices =

  updateUnreadCount: ->
    oldUnreadCount = parseInt $('#unread_count').text()
    $.get TM.path.unreadCount(), ({unreadCount}) ->
      $('#unread_count').text( unreadCount ).toggle(unreadCount > 0)
      N.refresh() if N.isSidebarActive() && oldUnreadCount > unreadCount

  refreshEvent: (e) ->
    if $(this).hasClass 'active'
      $(this).removeClass 'active'
    else
      $(this).addClass 'active'
      N.refresh()

    $("#notices_sidebar").slideToggle()

  refresh: () ->
    $('#notices_sidebar .notices').empty().addClass('loading')
    $.get '/notices/latest', (html) ->
      $('#notices_sidebar .notices').replaceWith html

  isSidebarActive: -> $('#notices_sidebar').is ':visible'

  togglePolling: (enabled) -> N._polling = enabled; N.poll()
  poll: ->
    return if N._polling == false
    N.updateUnreadCount()
    TM.delay _5_mins, N.poll

N = TM.Notices
$(document).ready -> N.togglePolling(true)

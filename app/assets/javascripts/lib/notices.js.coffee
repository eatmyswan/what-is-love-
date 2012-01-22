
# Inner-file shorthand reference to TM.Notices
N = null

TM.Notices =

  updateUnreadCount: ->
    return N.refresh() if N.isSidebarActive()
    $.get TM.path.unreadCount(), ({unreadCount}) ->
      $('#unread_count').text( unreadCount ).toggle(unreadCount > 0)

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

N = TM.Notices

TM.Capture =

  # When a task is being dragged its placeholder follows the cursor.
  #  If that placeholder reaches a top or bottom edge, make the view pane
  #  scroll to the item that is next to the placeholder.
  #
  sortableScrollable: (viewPane) ->
    # cache values
    viewPane = $('#group')
    viewPaneHeight = $('#group').height()
    viewPaneOffsetTop = $('#group').offset().top

    return (e,ui) ->
      offsetFromTop = ui.placeholder.offset().top - viewPaneOffsetTop

      if (offsetFromTop > viewPaneHeight - 30) && ui.placeholder.next().length
        scrollBottomEdgeToTask( ui.placeholder.next(), viewPane, 700 )
      else if (offsetFromTop < 30) && ui.placeholder.prev().length
        scrollToTask( ui.placeholder.prev(), viewPane, 700 )
      true

  # When the view pane is scroll animating, the sortable plugin
  #  doesn't capture mousemove events correctly.
  # To fix this, we force the sortable plugin to refresh its item
  #  positions on view pane scroll.
  #
  bindSortableScrollPatch: ($viewPane,$sortableElem) ->
    scrollTimer = null

    $viewPane.bind 'scroll.se', ->
      # Only refresh positions every so often, lest we
      # kill performance (and likely the browser)
      if !scrollTimer
        scrollTimer = setTimeout (->
          $sortableElem.sortable 'refreshPositions'
          scrollTimer = null
        ), 350
      return true

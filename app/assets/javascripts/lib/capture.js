TM.capture = {

  // When a task is being dragged its placeholder follows the cursor.
  //  If that placeholder reaches a top or bottom edge, make the view pane
  //  scroll to the item that is next to the placeholder.
  //
  sortableScrollable: function (viewPane) {
    // cache values
    var viewPane = $('#group')
      , viewPaneHeight = $('#group').height()
      , viewPaneOffsetTop = $('#group').offset().top
    ;
    return function (e,ui) {
      var offsetFromTop = ui.placeholder.offset().top - viewPaneOffsetTop;

      if (offsetFromTop > viewPaneHeight - 30 && ui.placeholder.next().length)
        scrollBottomEdgeToTask( ui.placeholder.next(), viewPane, 700 );
      else if (offsetFromTop < 30 && ui.placeholder.prev().length)
        scrollToTask( ui.placeholder.prev(), viewPane, 700 );
      return true;
    }
  },

  // When the view pane is scroll animating, the sortable plugin
  //  doesn't capture mousemove events correctly.
  // To fix this, we force the sortable plugin to refresh its item
  //  positions on view pane scroll.
  //
  bindSortableScrollPatch: function ($viewPane,$sortableElem) {
    var scrollTimer = null;

    $viewPane.bind('scroll.se', function () {
      // Only refresh positions every so often, lest we
      // kill performance (and likely the browser)
      if (!scrollTimer) {
        scrollTimer = setTimeout(function () {
          $sortableElem.sortable('refreshPositions');
          scrollTimer = null;
        }, 350);
      }
      return true;
    });
  }
};

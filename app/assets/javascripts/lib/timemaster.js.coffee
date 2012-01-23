#= require_self
#= require ./routes

defaultFancyboxOptions =
  showCloseButton: false
  overlayOpacity:  0.5
  overlayColor:   '#000'

window.TM =
  log: -> window.console?.log?.apply console, arguments
  delay: (ms, func) -> setTimeout func, ms

  bindFancybox: (selector, options = {}) ->
    $(document).on 'mouseover', selector, ->
      return if $(this).data 'init'
      $(this).data('init', true).fancybox $.extend {}, defaultFancyboxOptions, options

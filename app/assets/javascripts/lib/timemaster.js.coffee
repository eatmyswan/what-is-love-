window.TM =

  log: -> window.console?.log?.apply console, arguments
  delay: (ms, func) -> setTimeout func, ms

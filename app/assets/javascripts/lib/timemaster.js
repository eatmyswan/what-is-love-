window.TM = {

  log: function () {
    if(!this.debug) return;
    if(!window.console || !window.console.log) return;

    console.log.apply(console, arguments);
  }
};

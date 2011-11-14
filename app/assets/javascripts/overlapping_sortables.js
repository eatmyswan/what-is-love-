(function ($, undefined) {
	$.widget("ui.overlappingSortable", $.ui.sortable, {
		_init: function () {
			this.element.data("sortable", this.element.data("fixedSortable"));
			return $.ui.sortable.prototype._init.apply(this, arguments);
		},
		_create:function() {
			var result = $.ui.sortable.prototype._create.apply(this, arguments);
			this.containerCache.sortable = this;
			return result;
		},
		_intersectsWithPointer: function (item) {
			if (item.instance.element.hasClass("action_plan")) { 
				return false;
			}
			return $.ui.sortable.prototype._intersectsWithPointer.apply(this, arguments);
		}
	});
})(jQuery);
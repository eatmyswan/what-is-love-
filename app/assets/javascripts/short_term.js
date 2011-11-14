$(function(){

   $('ol#tasks-list').sortable({
		forcePlaceholderSize: true,
		helper:	'clone',
		items: 'li',
		opacity: .6,
		placeholder: 'task_drop_area',
		cursorAt: { top:25, left:50 },
		tolerance: 'pointer',
		start: function (e,ui) {
			$(ui.helper).addClass('ui_draggable_helper');
		}
	});

});
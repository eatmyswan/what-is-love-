$(document).ready(function() {

$('#day_plan_wrap li.task_wrap').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		var title = $(this).find('.task').first().text();
		title = $.trim(title);
		$(this).data("calEvent", { _id: $(this).attr('id'), start: '', end: '', title: title });
		$(this).draggable({ 
			helper: 'clone',
			appendTo: 'body',
			zIndex: 9999,
			opacity: 0.7
		});
	}
});



});



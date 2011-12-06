$(document).ready(function() {

$('#day_plan_wrap li.task_wrap').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		var outcome = $(this).hasClass('outcome') ? true : false;
		var title = $(this).find('.task').first().text();
		title = $.trim(title);
		var min_duration = parseInt($(this).attr('min_duration'));
		var group_id = $(this).attr('group_id');
		$(this).data("calEvent", { _id: $(this).attr('id'), start: '', end: '', title: title, min_duration: min_duration, outcome: outcome, group_id: group_id });
		$(this).draggable({ 
			helper: 'clone',
			appendTo: 'body',
			zIndex: 9999,
			opacity: 0.7
		});
	}
});



});



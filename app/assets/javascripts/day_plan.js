$(document).ready(function() {

$('#day_plan_wrap li.task_wrap').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		var outcome = $(this).hasClass('outcome_ready') ? true : false;
		var title = $(this).find('.task').first().text();
		var must = $(this).find('.star').first().hasClass('active') ? true : false;
		var complete = $(this).find('.checkbox').first().hasClass('active') ? true : false;
		title = $.trim(title);
		var min_duration = parseInt($(this).attr('min_duration'));
		var group_id = $(this).attr('group_id');
		$(this).data("calEvent", { _id: $(this).attr('id'), start: '', end: '', title: title, min_duration: min_duration, complete: complete, must: must, outcome: outcome, group_id: group_id });
		$(this).draggable({ 
			helper: 'clone',
			appendTo: 'body',
			zIndex: 9999,
			opacity: 0.7,
			cursorAt: { top: 17, left: 17 },
			scroll: false,
			start: function(event,ui){
				$(ui.helper).addClass('dragging_task');
			}
		});
	}
});



});



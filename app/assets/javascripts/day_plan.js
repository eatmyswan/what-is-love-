$(document).ready(function() {
	
$('#edit_plan').live('click', function(){
	
	if($('#day_plan_wrap').hasClass('planning')) {
		$('#day_plan_wrap').removeClass('planning');
		$('#day_plan_wrap').addClass('editing');		
		$('.task_wrap').draggable('disable');
		$('ul.sortable').sortable('enable');
		$('#input_wrap').slideDown(200);
		$('#edit_plan').addClass('active');
		$('#edit_plan').text('Done');
	} else {
		$('#day_plan_wrap').removeClass('editing');
		$('#day_plan_wrap').addClass('planning');
		$('.task_wrap').draggable('enable');
		$('ul.sortable').sortable('disable');
		$('#input_wrap').slideUp(200);
		$('#edit_plan').removeClass('active');
		$('#edit_plan').text('Edit')
	}

});
	
$('#day_plan_wrap.editing ul.sortable').live("mouseover", function() {
	console.log('sorting?');
	if (!$(this).data("init")) {
		$(this).data("init", true);
		$('ul.sortable').sortable({
		    connectWith: "ul.sortable",
		    placeholder: "drop_task",
			tolerance: "pointer",
		    toleranceElement: 'div',
			helper: "clone",
			appendTo: "body",
			cursorAt: { top: 17, left: 17 },
			scroll: false,
			start: function(event,ui){
				$(ui.helper).addClass('dragging_task');
			},
			stop: function(event,ui){
			}
		});
	}
});

$('#day_plan_wrap.planning li.task_wrap').live("mouseover", function() {
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



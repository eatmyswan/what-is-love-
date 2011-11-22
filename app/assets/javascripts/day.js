$(document).ready(function() {
	
$('.droppable').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		$('.droppable').sortable({
			connectWith: ".droppable",
			placeholder: "drop_task",
			tolerance: "pointer",
			helper: "clone",
			appendTo: "body",
			cursorAt: { top: 17, left: 17 },
			scroll: false,
			start: function(event,ui){
				$(ui.helper).addClass('dragging_task');
			},
			receive: function(event, ui) {
				if(!ui.item.parent().hasClass('time_drop')){
					ui.item.attr('style','').resizable( "destroy" );
				}
			}
		});
		
		$('#day_view .time_drop').droppable({
			tolerance: 'pointer',
			accept: '.cal_task',
		    drop:function(event,ui){
				date = $(this).attr('date');
		
				if(!ui.draggable.hasClass('ui-resizable')){
					var task = ui.draggable.clone();
					task.appendTo(this).show();
					ui.draggable.remove();
				} else {
					var task = ui.draggable;
				}
		
				var height = 75;
				var top = ui.position.top - 180 + parseInt($('.grid_hours_wrap').scrollTop());
				task.css({ 'height' : height, 'top' : top });
				//$.ajax({
				//	url: "/tasks/" + taskId,
				//	type: 'PUT',
				//	data: $.param({task : { starts_at: date, queued: 'true', scheduled: 'false' }}),
				//	success: function(d) { }
				//});
			}
		});

		$('.time_drop .task_wrap').live("mouseover", function() {
			if (!$(this).data("init")) {
				$(this).data("init", true);
				$(this).resizable({
					handles: 'n, s'
				});
			}
		});

	}
});
	
	
});
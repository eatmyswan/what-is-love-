$(document).ready(function() {
	
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
	}
});
	
$('.queue_day').droppable({
	tolerance: 'pointer',
	accept: '.cal_task',
    drop:function(event,ui){
		date = $(this).attr('date');
		$(this).append(ui.draggable.clone());
		var taskId = $(ui.draggable).attr('id');
		$.ajax({
			url: "/tasks/" + taskId,
			type: 'PUT',
			data: $.param({task : { starts_at: date, queued: 'true', scheduled: 'false' }}),
			success: function(d) { }
		});
	}
});
	
	
});
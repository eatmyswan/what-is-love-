$(document).ready(function() {

$('#week_view .time_drop').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		$('#week_view .time_drop').droppable({
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
				var top = ui.position.top - 195 + parseInt($('.grid_hours_wrap').scrollTop());
				task.css({ 'height' : height, 'top' : top });
				//$.ajax({
				//	url: "/tasks/" + taskId,
				//	type: 'PUT',
				//	data: $.param({task : { starts_at: date, queued: 'true', scheduled: 'false' }}),
				//	success: function(d) { }
				//});
			}
		});
	}
});

});
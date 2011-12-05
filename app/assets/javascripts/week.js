$(document).ready(function() {

	$('#prev').live('click', function() {
		$('#forecast,#schedule,#side_schedule').weekCalendar('prev');
	});
	
	$('#next').live('click', function() {
		$('#forecast,#schedule,#side_schedule').weekCalendar('next');
	});
	
	$('#today').live('click', function() {
		$('#forecast,#schedule,#side_schedule').weekCalendar('today');
	});
	
	$('#cluetip #create_event').live('click',function(){
		var title = $('#cluetip #new_event .task_title').val();
		var start = $('#cluetip #new_event .task_dbstart').val();
		var end = $('#cluetip #new_event .task_dbend').val();
		$.ajax({
			url: "/tasks",
			type: 'POST',
			data: $.param({task : { title: title, start: start, end: end, readOnly: 'true', scheduled: 'true' }}),
			success: function(data){
				$(document).trigger('hideCluetip');
				$('#forecast,#schedule,#side_schedule').weekCalendar('updateEvent', data);
			}
		});
	});
	
	$('#cluetip #update_event').live('click',function(){
		var title = $('#cluetip #edit_event .task_title').val();
		var start = $('#cluetip #edit_event .task_dbstart').val();
		var end = $('#cluetip #edit_event .task_dbend').val();
		var taskId = $('#cluetip #edit_event .task_id').val();
		$.ajax({
			url: "/tasks/" + taskId,
			type: 'PUT',
			data: $.param({task : { title: title, start: start, end: end }}),
			success: function(data){
				$(document).trigger('hideCluetip');
				$('#forecast,#schedule,#side_schedule').weekCalendar('updateEvent', data);
			}
		});
	});
	
	$('#cluetip #delete_event').live('click',function(){
		var taskId = $('#cluetip #edit_event .task_id').val();
		$.ajax({
			url: "/tasks/" + taskId,
			type: 'DELETE',
			success: function(){
				$(document).trigger('hideCluetip');
				$('#forecast,#schedule,#side_schedule').weekCalendar('removeEvent', taskId);
			}
		});
	});
	
	$('.wc-cal-event').live("mouseover", function() {
		if (!$(this).data("init") && !$(this).hasClass('wc-new-cal-event')) {
			$(this).data("init", true);
			$(this).attr('rel','#edit_event').cluetip({
				activation:  'click',
				local: true,
				leftOffset: 0,
				topOffset: 60,
				width: 300,
				onShow: function() {
					$(document).bind('click',function(e) {
						var cluetipClick = $(e.target).closest('#cluetip');
						var eventClick = $(e.target).closest('.wc-cal-event');
						if ((cluetipClick.length === 0 && eventClick.length === 0) || ($(e.target).hasClass('cancel_cluetip'))){ 
							$(document).trigger('hideCluetip');
							$('#forecast,#schedule,#side_schedule').weekCalendar('removeUnsavedEvents');
						}
					});
				
				}
			});
		}
	});

});
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
		var minD = $('#cluetip #new_event .task_min_duration').val();
		$.ajax({
			url: "/tasks",
			type: 'POST',
			data: $.param({task : { title: title, start: start, end: end, min_duration: minD, readOnly: 'true', scheduled: 'true' }}),
			success: function(data){
				$(document).trigger('hideCluetip');
				$('#forecast,#schedule,#side_schedule').weekCalendar('updateEvent', data);
				calculateMinD();
			}
		});
	});
	
	$('#cluetip #update_event').live('click',function(){
		var title = $('#cluetip #edit_event .task_title').val();
		var start = $('#cluetip #edit_event .task_dbstart').val();
		var end = $('#cluetip #edit_event .task_dbend').val();
		var taskId = $('#cluetip #edit_event .task_id').val();
		var readonly = $('#cluetip #edit_event .task_readonly').val();
		$.ajax({
			url: "/tasks/" + taskId,
			type: 'PUT',
			data: $.param({task : { title: title, start: start, end: end, readOnly: readonly }}),
			success: function(data){
				$(document).trigger('hideCluetip');
				$('#forecast,#schedule,#side_schedule').weekCalendar('updateEvent', data);
				calculateMinD();
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
				calculateMinD();
			}
		});
	});
	
	$('#readonly_check').live('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('#cluetip input.task_readonly').val('false');
		} else {
			$(this).addClass('active');
			$('#cluetip input.task_readonly').val('true');
		}
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

	function calculateMinD(){
			var minD = 0;
			var serialized = $('#schedule').weekCalendar('serializeEvents');
			$(serialized).each(function(){
				minD = this.min_duration + minD;
			});
			var hour = parseInt(minD/60).toString();
			var min = parseInt(minD%60).toString();
			hour = (hour.length == 1) ? '0'+hour : hour;
			min = (min.length == 1) ? '0'+min : min;
			$('#schedule_side .must_wrap .time').text(hour+':'+min);
			$('#schedule_side .total_wrap .time').text(hour+':'+min);
	}

});
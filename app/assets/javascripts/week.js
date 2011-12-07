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
			data: $.param({task : { title: title, start: start, end: end, min_duration: minD, readOnly: 'true', scheduled: 'true' }, json: 'true'}),
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
		var complete = $('#cluetip #edit_event .task_complete').val();
		$.ajax({
			url: "/tasks/" + taskId,
			type: 'PUT',
			data: $.param({task : { title: title, start: start, end: end, readOnly: readonly, complete: complete }, json: 'true'}),
			success: function(data){
				$(document).trigger('hideCluetip');
				$('#forecast,#schedule,#side_schedule').weekCalendar('updateEvent', data);
				calculateMinD();
			}
		});
	});
	
	$('#cluetip #delete_event').live('click',function(){
		var taskId = $('#cluetip #edit_event .task_id').val();
		var groupId = $('#cluetip #edit_event .group_id').val();
		if(groupId) {
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { scheduled: 'false', readOnly: 'false' }, nothing: 'true'}),
				success: function(data){
					$(document).trigger('hideCluetip');
					$('#forecast,#schedule,#side_schedule').weekCalendar('removeEvent', taskId);
					calculateMinD();
				}
			});
		} else {
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'DELETE',
				success: function(){
					$(document).trigger('hideCluetip');
					$('#forecast,#schedule,#side_schedule').weekCalendar('removeEvent', taskId);
					calculateMinD();
				}
			});
		}
	});
	
	$('#cluetip #complete').live('click',function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('input.task_complete').val('false');
		} else {
			$(this).addClass('active');
			$('input.task_complete').val('true');
		}
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
				leftOffset: 9,
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
		var minDTotal = 0;
		if($('#schedule').length == 1){
			var serialized = $('#schedule').weekCalendar('serializeEvents');
		} else if ($('#side_schedule').length == 1) {
			var serialized = $('#side_schedule').weekCalendar('serializeEvents');
		} 
		$(serialized).each(function(){
			if(this.complete == false){
				if(this.must == true)  minD = this.min_duration + minD;
				minDTotal = this.min_duration + minDTotal;
			}
		});
		var hour = parseInt(minD/60).toString();
		var min = parseInt(minD%60).toString();
		hour = (hour.length == 1) ? '0'+hour : hour;
		min = (min.length == 1) ? '0'+min : min;
	
		var hourTotal = parseInt(minDTotal/60).toString();
		var minTotal = parseInt(minDTotal%60).toString();
		hourTotal = (hourTotal.length == 1) ? '0'+hourTotal : hourTotal;
		minTotal = (minTotal.length == 1) ? '0'+minTotal : minTotal;
	
		$('.must_wrap .time').text(hour+':'+min);
		$('.total_wrap .time').text(hourTotal+':'+minTotal);
	}

});
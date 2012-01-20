
$(document).ready(function() {

	var startDate = new Date();
	
	$("#datepicker").datepicker({
		defaultDate: startDate,
		showOtherMonths: true,
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['S','M','T','W','T','F','S'],
		beforeShowDay: function(date){
			var title = dbDate(date);
			if(date.getDay() == 0) return [1,'droppable sunday',title];
			if(date.getDay() == 6) return [1,'droppable saturday',title];
			return [1,'droppable',title];
		},
		onSelect: function(dateText, inst){
			if($('#capture_wrap').length == 1 && $('#day').hasClass('active')) $.get("/day/capture/" + dateText);
			if($('#capture_wrap').length == 1 && $('#week').hasClass('active')) $.get("/week/capture/" + dateText);
			if($('#day_plan_wrap').length == 1 && $('#day').hasClass('active')) $.get("/day/plan/" + dateText);
			if($('#day_plan_wrap').length == 1 && $('#week').hasClass('active')) $.get("/week/plan/" + dateText);
			if($('#schedule').length == 1) $.get("/day/schedule/" + dateText);
			if($('#forecast').length == 1) $.get("/week/forecast/" + dateText);
		},
		onChangeMonthYear: function(year, month, inst) { 
			droppable();
		}
	});
	
	droppable();
	
	$('#cal_popup .done').live('click', function() {
		var where = $('input[name=group]:checked').val();
		var hour = $('#date_hour').val();
		var min = $('#date_minute').val();
		var date = $('#cal_date').val();
		var minDur = parseInt($('#cal_minDur').val());
			minDur = isNaN(minDur) ? 0 : minDur;
		var taskId = $('#cal_taskId').val();
		var parentId = $('#cal_parentId').val();
		var plan = 'false';
		var week = 'false';
		var scheduled = 'false';
		var committed = 'false';
		var nothing = 'false';
		var start = '';
		var end = '';
		$('.ui-datepicker-over').removeClass('ui-datepicker-over');
		if(where == 'dayCapture') {
			start = date;
			end = date;
		}
		if(where == 'dayPlan'){ 
			plan = 'true';
			start = date;
			end = date;
		}
		if(where == 'weekCapture'){ 
			week = 'true';
			start = date;
			end = date;
		}
		if(where == 'weekPlan') { 
			week = 'true';
			plan = 'true';
			start = date;
			end = date;
		}
		if(where == 'schedule') { 
			plan = 'true';
			scheduled = 'true';
			committed = 'true';
			start = date+' '+hour+':'+min+':00';
			minDur = (minDur == 0) ? 60 : parseInt(minDur);
				var eHour = Math.floor(minDur/60);
					eHour = (parseInt(hour) + eHour).toString();
					eHour = (eHour.length == 1) ? '0'+ eHou.toString() : eHour;
				var eMin = minDur%60;
					eMin = (parseInt(min) + eMin).toString();
					eMin = (eMin.length == 1) ? '0'+ eMin : eMin;
			end = date+' '+eHour+':'+eMin+':00';
		}
		if($('#capture_wrap').length == 1 || $('#day_plan_wrap').length == 1) nothing = 'true';

		//check if outcome block needs to be added to capture or plan
		if(parentId.length > 0) {
			$.ajax({
				url: "/tasks/" + parentId,
				type: 'PUT',
				data: $.param({task : { plan: plan, week: week }, nothing: 'true'})
			}); 
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { start: start, end: end, min_duration: minDur, sort: '0', scheduled: scheduled, committed: committed }, nothing: nothing}),
				success: function() {
					$('#cal_popup').hide();
					$('#schedule_check_selects').hide();
					$("#day_check").attr("checked", "checked");
				}
			}); 	
		} else {
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { start: start, end: end, min_duration: minDur, sort: '0', plan: plan, week: week, scheduled: scheduled, committed: committed }, nothing: nothing}),
				success: function() {
					$('#cal_popup').hide();
					$('#schedule_check_selects').hide();
					$("#day_check").attr("checked", "checked");
				}
			}); 	
		}
	});
	
	$('#schedule_check').live('click', function() {
		$('#schedule_check_selects').show();
	});
	
});

function droppable() {
	$('#datepicker .droppable').droppable({
		accept: '.task_wrap',
		tolerance: 'pointer',
		over: function(event,ui){
			$('.dragging_task').css('opacity',0.3);
			$(this).addClass('ui-datepicker-over');
			$('.category').droppable('disable');
		},
		out: function(event,ui){
			$(this).removeClass('ui-datepicker-over');
			$('.category').droppable('enable');
		},
		drop: function(event,ui){
			$('.category').droppable('enable');
			var taskId = ui.draggable.attr('id');
			var minDur = ui.draggable.attr('min_duration');
			var parentId = ui.draggable.attr('parent_id');
			var date = $(this).attr('title');
			$('#cal_date').val(date);
			$('#cal_taskId').val(taskId);
			$('#cal_minDur').val(minDur);
			$('#cal_parentId').val(parentId);
			
			var left = ui.position.left - 90;
			var top = ui.position.top - 140;
			
			if((left + 220) > $(document).width()) {
				left = $(document).width() - 250;
			}

			$('#cal_popup').css({
				'top' : top,
				'left' : left
			}).show();
			
			if($('#plan_wrap').length == 1) {
				 $('ul.sortable').sortable('cancel');
			}
			if($('#capture_wrap').length == 1) {
				$('ul.sortable').sortable('cancel');
				ui.draggable.remove();
				calculateResultCount();
			}
			if($('#day_plan_wrap').length == 1) {
				ui.draggable.remove();
				calculateResultCount();
			}
			if($('#forecast').length == 1) {
				ui.draggable.remove();
			}
		}
	});
}

function dbDate(date){
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
		month = month.toString();
		month = (month.length == 1) ? '0'+month : month;
	var day = date.getDate().toString();
		day = (day.length == 1) ? '0'+day : day;
	return year+'-'+month+'-'+day;
}

function calculateResultCount() {
	var count = $('#side_plan').children().length;
	$('.result_count_wrap .count').text(count);
}




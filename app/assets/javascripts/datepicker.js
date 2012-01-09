
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
			if($('#capture_wrap').length == 1) $.get("/day/capture/" + dateText);
		},
		onChangeMonthYear: function(year, month, inst) { 
			droppable();
		}
	});
	
	droppable();
	
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
			var date = $(this).attr('title');
			if($('#plan_wrap').length == 1) mylifeDrop(ui, taskId, date);
			if($('#capture_wrap').length == 1) captureDrop(ui, taskId, date);
			if($('#day_plan_wrap').length == 1) planDrop(ui, taskId, date);
		}
	});
}

function captureDrop(ui, taskId, date) {
	$(ui.sender).sortable('cancel');
	ui.draggable.remove();
	calculateResultCount();
	$.ajax({
		url: "/tasks/" + taskId,
		type: 'PUT',
		data: $.param({task : { start: date, sort: '0' }}),
		success: function(){
			$('.ui-datepicker-over').removeClass('ui-datepicker-over');
		}
	});
}

function planDrop(ui, taskId, date) {
	ui.draggable.remove();
	calculateResultCount();
	$.ajax({
		url: "/tasks/" + taskId,
		type: 'PUT',
		data: $.param({task : { start: date, plan: 'true', sort: '0' }}),
		success: function(){
			$('.ui-datepicker-over').removeClass('ui-datepicker-over');
		}
	});
}

function mylifeDrop(ui, taskId, date){
	$(ui.sender).sortable('cancel');
	$.ajax({
		url: "/tasks/" + taskId,
		type: 'PUT',
		data: $.param({task : { start: date }}),
		success: function(){
			$('.ui-datepicker-over').removeClass('ui-datepicker-over');
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




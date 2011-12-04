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
	$('#cancel_event').live('click',function(){
		$(document).trigger('hideCluetip');
		$('#forecast,#schedule,#side_schedule').weekCalendar('removeUnsavedEvents');
	});
	$('#save_event').live('click',function(){
		console.log('save this stuff');
	});
	

});
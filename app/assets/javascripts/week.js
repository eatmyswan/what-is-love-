$(document).ready(function() {

	$('#prev').live('click', function() {
		$('#forecast').weekCalendar('prev');
	});
	$('#next').live('click', function() {
		$('#forecast').weekCalendar('next');
	});
	$('#today').live('click', function() {
		$('#forecast').weekCalendar('today');
	});
	

});
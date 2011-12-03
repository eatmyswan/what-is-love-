$(document).ready(function() {

	$('#prev').live('click', function() {
		$('#forecast,#schedule').weekCalendar('prev');
	});
	$('#next').live('click', function() {
		$('#forecast,#schedule').weekCalendar('next');
	});
	$('#today').live('click', function() {
		$('#forecast,#schedule').weekCalendar('today');
	});
	

});
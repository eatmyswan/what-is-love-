// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function() {
	$('input[id^="task_scheduled"]').datepicker({
		dateFormat: 'yy-mm-dd',
		showButtonPanel: true, 
		closeText: 'No Date', 
		showOn: 'button',
		buttonImage: '/images/mini_cal.png',
		buttonImageOnly: true,
		onSelect: function (dateText, inst) {
				$(this).parent('form').submit();
		}
	});
	
	$('.schedule_tab').live('click', function() {
		var id = $(this).attr('tid');
		$('#task_scheduled_'+id).datepicker("show");
	});
	
	$.datepicker._generateHTML_Old = $.datepicker._generateHTML; $.datepicker._generateHTML = function(inst) {
    	res = this._generateHTML_Old(inst); res = res.replace("_hideDatepicker()","_clearDate('#"+inst.id+"')"); return res;
	} 
	
	$('.duration_tab').cluetip({
		positionBy: 'fixed',
		topOffset: 27,
		leftOffset: -277,
		activation: 'click',
		arrows: true,
		cluezIndex: 9999
	});
	
	$('.leverage_tab').cluetip({
		positionBy: 'fixed',
		topOffset: 27,
		leftOffset: -277,
		activation: 'click',
		arrows: true,
		cluezIndex: 9999
	});
	
	$('.set_duration').live('click', function() {
		var id = $(this).attr('tid');
		var dur = $(this).attr('dur');
		$('#task_duration_'+id).val(dur);
		$('#task_duration_'+id).parent('form').submit();
		$(document).trigger('hideCluetip');
		return false;
	});
});
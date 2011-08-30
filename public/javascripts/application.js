// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function() {
	
	$('a.complete_off').click(function(e) { 
		var xOffset = 24 + 285; 
        var yOffset = 24; 
        $(this).parent().parent().fadeOut(300, function() { $(this).remove(); });
        $('.poof').css({ 
            left: e.pageX - xOffset + 'px', 
            top: e.pageY - yOffset + 'px' 
        }).show(); 
        animatePoof();
    }); 

	function animatePoof() { 
	    var bgTop = 0; 
	    var frames = 5; 
	    var frameSize = 32; 
	    var frameRate = 80; 
	    for(i = 1; i < frames; i ++) { 
        $('.poof').animate({ 
            backgroundPosition: '0 ' + (bgTop - frameSize) 
        }, frameRate); 
        bgTop -= frameSize; 
    } 
    setTimeout("$('.poof').hide()", frames * frameRate); 
	}
	
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
		cluezIndex: 9999
	});
	
	$('.leverage_tab').cluetip({
		positionBy: 'fixed',
		topOffset: 27,
		leftOffset: -277,
		activation: 'click',
		cluezIndex: 9999
	});
	
	$('.group_icon').cluetip({
		positionBy: 'fixed',
		topOffset: 27,
		leftOffset: -20,
		activation: 'click',
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
	
	$('a#add_personal_group').live('click', function() {
		$('form#new_group_personal').slideDown();
		$('form#new_group_personal').next().css({'border-top':'1px solid #e9e9e9'});
		
	});
	
	$('a#add_professional_group').live('click', function() {
		$('form#new_group_professional').slideDown();
		$('form#new_group_professional').next().css({'border-top':'1px solid #e9e9e9'});
	});
	
	$('#select_icon .group_icon').live('click',function() {
		var icon = $(this).attr('class');
		icon = icon.split(" ");
		icon = icon[1]
		$("form#group_icon input#hidden_icon").val(icon);
		$("form#group_icon").submit();
	});
});
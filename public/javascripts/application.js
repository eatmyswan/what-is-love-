function load_email_audio(ids) {
	ids = ids.split(' ');
	$('#recorder').load('/task/' + ids[0] + '/email/' + ids[1] + '/mini_player');
	$('#new_email').attr("action", '/email/update/' + ids[1]);
	$('<input>').attr({
    	type: 'hidden',
    	name: 'task_id',
		value: ids[0]
	}).prependTo('#new_email');
}

function resize_for_microphone_access() {
	$('#VOCWordToYourMp3').height(137);
}
	
	
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
	
	
	$(".leverage_tab").fancybox({
		'width' : 560,
		'height' : 340,
		'overlayColor' : '#000',
		'overlayOpacity' : 0.3,
		'showCloseButton' : false
	});
	
	$('#close_fancybox').live('click', function() {
		$.fancybox.close();
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
	
	$('#select_background .thumbnail').live('click',function() {
		var bg = $(this).attr('class');
		bg = bg.split(" ");
		bg = bg[1]
		$("form#account_background input#hidden_background").val(bg);
		$("form#account_background").submit();
	});

	$(".week_event").draggable({
		helper: 'clone'
	});
	$(".week_event").resizable({
		stop : function(event,ui) {
			var time = ((ui.position.left + ui.size.width + 12)/ 75).toFixed(2);
			hour = Math.floor(time.toString().split('.')[0]).toString();
			min = Math.floor(time.toString().split('.')[1] * 0.6).toString();
			if(min.length == 1) {
				 min = '0' + min;
			};
			time = hour + ':' + min + ':' + '00 +0000';
			var date = $(this).parent().attr('date');
			var endsAt = date + " " + time;
			
			$.ajax({
				url: "/tasks/" +  $(this).attr('id'),
				type: 'PUT',
				data: $.param({task : { ends_at: endsAt }}),
				success: function(d) {  }
			});
		}
	});
	$(".full_day_row").droppable({
		drop: function(event, ui) {
			$(ui.draggable).appendTo(this);
			$(ui.draggable).css({ 'left' : ui.position.left });
			
			var date = $(this).attr('date');
			
			var startTime = (ui.position.left / 75).toFixed(2);
			hour = Math.floor(startTime.toString().split('.')[0]).toString();
			min = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
			if(min.length == 1) { min = '0' + min; };
			startTime = hour + ':' + min + ':' + '00 +0000';
			var startsAt = date + " " + startTime;
			var startTimeDisplay = hour + ":" + min;
			
			if(hour < 12 && hour != 0) {
				startTimeDisplay = hour + ":" + min + "AM";
			} else if (hour == 12) {
				startTimeDisplay = hour + ":" + min + "PM";
			} else if (hour == 0) {
				startTimeDisplay = "12:" + min + "AM";
			} else {
				var newHour = hour - 12
				startTimeDisplay = newHour + ":" + min + "PM";
			}
			
			ui.draggable.find('.start_time').html(startTimeDisplay);
			
			var endTime = ((ui.position.left + parseInt(ui.draggable.css('width')) + 12)/ 75).toFixed(2);
			hour = Math.floor(endTime.toString().split('.')[0]).toString();
			min = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
			if(min.length == 1) { min = '0' + min; };
			endTime = hour + ':' + min + ':' + '00 +0000';
			var endsAt = date + " " + endTime;
				
			$.ajax({
				url: "/tasks/" +  ui.draggable.attr('id'),
				type: 'PUT',
				data: $.param({task : { starts_at: startsAt, ends_at: endsAt }}),
				success: function(d) {  }
			});
		}
	});
	
});
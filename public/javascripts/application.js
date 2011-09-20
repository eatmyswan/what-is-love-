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
	
	
	$('.schedule_tab').live('click', function() {
		var id = $(this).attr('tid');
		$('#task_scheduled_'+id).datepicker("show");
	});
	
	
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


	$(".week_event").resizable({
		stop : function(event,ui) {
			var startTime = (ui.position.left / 75).toFixed(2);
			shour = Math.floor(startTime.toString().split('.')[0]).toString();
			smin = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
			if(smin.length == 1) { smin = '0' + smin; };
			startTime = shour + ':' + smin + ':' + '00 +0000';
			var startsAt = date + " " + startTime;
			
			var endTime = ((ui.position.left + parseInt($(this).css('width')) + 12)/ 75).toFixed(2);
			ehour = Math.floor(endTime.toString().split('.')[0]).toString();
			emin = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
			if(emin.length == 1) { emin = '0' + emin; };
			endTime = ehour + ':' + emin + ':' + '00 +0000';
			var endsAt = date + " " + endTime;
			
			var timeDisplay = shour + ":" + smin + " - " + ehour + ":" + emin;
			$(this).find('.start_time').html(timeDisplay);
			
			time = ehour + ':' + emin + ':' + '00 +0000';
			var date = $(this).parent().attr('date');
			var endsAt = date + " " + time;
			
			$.ajax({
				url: "/tasks/" +  $(this).attr('id'),
				type: 'PUT',
				data: $.param({task : { ends_at: endsAt }}),
				success: function(d) {  }
			});
		}
	}).draggable({
		helper: 'clone'
	});
	
	$(".full_day_row").droppable({
		drop: function(event, ui) {
			$(ui.draggable).appendTo(this);
			$(ui.draggable).css({ 'left' : ui.position.left });
			
			var date = $(this).attr('date');
			
			var startTime = (ui.position.left / 75).toFixed(2);
			shour = Math.floor(startTime.toString().split('.')[0]).toString();
			smin = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
			if(smin.length == 1) { smin = '0' + smin; };
			startTime = shour + ':' + smin + ':' + '00 +0000';
			var startsAt = date + " " + startTime;
			
			var endTime = ((ui.position.left + parseInt(ui.draggable.css('width')) + 12)/ 75).toFixed(2);
			ehour = Math.floor(endTime.toString().split('.')[0]).toString();
			emin = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
			if(emin.length == 1) { emin = '0' + emin; };
			endTime = ehour + ':' + emin + ':' + '00 +0000';
			var endsAt = date + " " + endTime;
			
			var timeDisplay = shour + ":" + smin + " - " + ehour + ":" + emin;
			ui.draggable.find('.start_time').html(timeDisplay);
				
			$.ajax({
				url: "/tasks/" +  ui.draggable.attr('id'),
				type: 'PUT',
				data: $.param({task : { starts_at: startsAt, ends_at: endsAt }}),
				success: function(d) {  }
			});
		}
	});
	
    $('#tasks-list').sortable({
		helper: 'clone',
        dropOnEmpty: false, 
        handle: '.task_drag', 
        items: '.task_wrap',
        opacity: 0.4,
        scroll: true,
        update: function(){
          $.ajax({
              type: 'post', 
              data: $(this).sortable('serialize'), 
              dataType: 'script', 
              complete: function(request){ },
              url: '/tasks/sort_tasks'});
          }
       }).draggable();

   $('#blocks-list').sortable({
        dropOnEmpty: false, 
        handle: '.block_drag', 
        items: '.block_wrap',
        opacity: 0.4,
        scroll: true,
        update: function(){
          $.ajax({
              type: 'post', 
              data: $(this).sortable('serialize'), 
              dataType: 'script', 
              complete: function(request){ },
              url: '/blocks/sort_blocks'});
          }
       });

   $('.task_padding').sortable({
        dropOnEmpty: false, 
        handle: '.task_drag', 
        items: '.task_wrap',
        opacity: 0.4,
        scroll: true,
        update: function(){
          $.ajax({
              type: 'post', 
              data: $(this).sortable('serialize'), 
              dataType: 'script', 
              complete: function(request){ },
              url: '/tasks/sort_tasks'});
          }
    });
	
	var t = 0;
	
	$('#datepicker').datepicker({
		dateFormat: 'yy-mm-dd',
		dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		inline: true,
		defaultDate: $('#start_date').val(),
		showOtherMonths: true,

		onSelect: function(dateText, inst) {
			if(t > 0){
			window.location = '/forecast/index?business_hours=false&start_date=' + dateText
			}
			t++;
		}
	});
	
	$(".ui-state-default").droppable({
        hoverClass:'hovered',
		tolerance: 'pointer',
        drop:function(event,ui){
			var str= $(this).parent().attr('onclick');
			var patt=/\(+.+\)/;
			var match = str.match(patt).toString();
			match = match.split(',');
			var month = parseInt(match[1]) + 1;
			var year = match[2]
			var day = $(this).text();
			var date = year + '-' + month + '-' + day;	
			var taskId = $(ui.draggable).attr('id');
			taskId = taskId.split('_')[1];
			alert('Schedule ' + taskId + ' for ' + date);
        }
    });
	
	if($('#start_date').length == 0) {
		$('.ui-datepicker-current-day').removeClass('ui-datepicker-current-day');
	}
	
});
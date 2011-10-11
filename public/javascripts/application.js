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
	
	$(".notes_tab").fancybox({
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
		activation: 'dblclick',
		cluezIndex: 9999
	});
	
	$('.set_duration_min').live('click', function() {
		var dur = $(this).attr('dur');
		$('.min_duration_input').val(dur);
	});
	
	$('.set_duration_max').live('click', function() {
		var dur = $(this).attr('dur');
		$('.max_duration_input').val(dur);
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
	
	$(".full_day_row").droppable({
		greedy: false,
		tolerance: 'pointer',
		drop: function(event, ui) {
			
			var date = $(this).attr('date');
			var scrollLeft = parseInt($('.hours').scrollLeft());
			
			if($(ui.draggable).hasClass('queue_item')){
				var taskId = $(ui.draggable).attr('id');
				var task = '<div class="week_event_wrap" id="'+ taskId +'"><div class="week_event"><div class="task">' + $(ui.draggable).find('.task').text() + '</div></div><span class="lock"></span><div class="start_time"></div></div>';
				$(task).appendTo(this);
				var left = ui.position.left;
				$(ui.draggable).remove();
				var task = $("#" + taskId);
				$(task).css({ 'left' : left + scrollLeft - 117, 'top' : '0', 'width' : '200' });
				var startTime = (parseInt(left + scrollLeft - 117) / 75  ).toFixed(2);
				var endTime = ((parseInt(left + scrollLeft - 117) + 200)/ 75).toFixed(2);
				
			} else {
				$(ui.draggable).appendTo(this);
				$(ui.draggable).css({ 'left' : ui.position.left + scrollLeft - 117 });
				var startTime = (parseInt(ui.position.left + scrollLeft - 117) / 75  ).toFixed(2);
				var endTime = ((parseInt(ui.position.left + scrollLeft - 117) + parseInt(ui.draggable.css('width')) + 12)/ 75).toFixed(2);
			}
			
			
			
			shour = Math.floor(startTime.toString().split('.')[0]).toString();
			smin = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
			if(smin.length == 1) { smin = '0' + smin; };
			startTime = shour + ':' + smin + ':' + '00';
			var startsAt = date + " " + startTime;

			ehour = Math.floor(endTime.toString().split('.')[0]).toString();
			emin = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
			if(emin.length == 1) { emin = '0' + emin; };
			endTime = ehour + ':' + emin + ':' + '00';
			var endsAt = date + " " + endTime;
			
			var dssuffix = "AM";
			var desuffix = "AM";
			var dshour = shour;
			var dehour = ehour;
			if (shour >= 12) {
				dssuffix = "PM";
				dshour = shour - 12;
			}
			if (ehour >= 12) {
				desuffix = "PM";
				dehour = ehour - 12;
			}
			if (dshour == 0) dshour = 12;	
			if (dehour == 0) dehour = 12;
	
			var timeDisplay = dshour + ":" + smin + dssuffix + " - " + dehour + ":" + emin + desuffix;
			ui.draggable.find('.start_time').html(timeDisplay);
		
			$.ajax({
				url: "/tasks/" +  ui.draggable.attr('id'),
				type: 'PUT',
				data: $.param({task : { starts_at: startsAt, ends_at: endsAt }}),
				success: function(d) {  }
			});
		}
	});
	
	$('.week_event_wrap').live("mouseover", function() {

		$(this).addClass('event_hover');
		
		if (!$(this).data("init")) {
			$(this).data("init", true);
				$(this).resizable({
				handles: 'e, w',
				minWidth: 75,
				resize: function(event,ui) {
					var startTime = (ui.position.left / 75).toFixed(2);
					shour = Math.floor(startTime.toString().split('.')[0]).toString();
					smin = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
					if(smin.length == 1) { smin = '0' + smin; };

					var endTime = ((ui.position.left + parseInt($(this).css('width')) + 12)/ 75).toFixed(2);
					ehour = Math.floor(endTime.toString().split('.')[0]).toString();
					emin = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
					if(emin.length == 1) { emin = '0' + emin; };

					var dssuffix = "AM";
					var desuffix = "AM";
					var dshour = shour;
					var dehour = ehour;
					if (shour >= 12) {
						dssuffix = "PM";
						dshour = shour - 12;
					}
					if (ehour >= 12) {
						desuffix = "PM";
						dehour = ehour - 12;
					}
					if (dshour == 0) dshour = 12;	
					if (dehour == 0) dehour = 12;
		
					var timeDisplay = dshour + ":" + smin + dssuffix + " - " + dehour + ":" + emin + desuffix;
					$(this).find('.start_time').html(timeDisplay);
				},
				stop : function(event,ui) {
					var date = $(this).parent().attr('date');
						
					var startTime = (ui.position.left / 75).toFixed(2);
					shour = Math.floor(startTime.toString().split('.')[0]).toString();
					smin = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
					if(smin.length == 1) { smin = '0' + smin; };
					startTime = shour + ':' + smin + ':' + '00';
					var startsAt = date + " " + startTime;

					var endTime = ((ui.position.left + parseInt($(this).css('width')) + 12)/ 75).toFixed(2);
					ehour = Math.floor(endTime.toString().split('.')[0]).toString();
					emin = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
					if(emin.length == 1) { emin = '0' + emin; };
					endTime = ehour + ':' + emin + ':' + '00';
					var endsAt = date + " " + endTime;
					
					var dssuffix = "AM";
					var desuffix = "AM";
					var dshour = shour;
					var dehour = ehour;
					if (shour >= 12) {
						dssuffix = "PM";
						dshour = shour - 12;
					}
					if (ehour >= 12) {
						desuffix = "PM";
						dehour = ehour - 12;
					}
					if (dshour == 0) dshour = 12;	
					if (dehour == 0) dehour = 12;
		
					var timeDisplay = dshour + ":" + smin + dssuffix + " - " + dehour + ":" + emin + desuffix;
					$(this).find('.start_time').html(timeDisplay);
		
					$.ajax({
						url: "/tasks/" +  $(this).attr('id'),
						type: 'PUT',
						data: $.param({task : { starts_at: startsAt, ends_at: endsAt }}),
						success: function(d) {  }
					});
				}
			}).draggable({
				appendTo: '#forecast_wrap',
       			helper: 'clone',
				zIndex: 9999,
				opacity: 0.7,
				stop: function(e, ui) {
					//alert(ui.toSource());
				}
			});
		}
	});
	
	$('.week_event_wrap').live("mouseout", function() {
		$(this).removeClass('event_hover');
	});
	
	
	$('.queue_item').live("mouseover", function() {
		if (!$(this).data("init")) {
			$(this).data("init", true);
			$(this).draggable({ 
				appendTo: '#forecast_wrap',
       			helper: 'clone',
				zIndex: 9999
			});
		}
	});
	
	$('.queue_day').droppable({
		tolerance: 'pointer',
		greedy: true,
		hoverClass: 'queue_hover',
		over: function(event,ui){
			$('.full_day_row').droppable( "disable" );
		},
		out: function(event,ui){
			$('.full_day_row').droppable( "enable" );
		},
        drop:function(event,ui){
			$('.full_day_row').droppable( "enable" );
			date = $(this).attr('date');
			var taskId = $(ui.draggable).attr('id');
			var task = $(ui.draggable).find('.task').text();
			$(ui.draggable).remove();
			$(this).append('<div class="queue_item" id="'+ taskId +'"><div class="task">' + task + '</div></div>');
	
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { starts_at: date, ends_at: '' }}),
				success: function(d) { }
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
		helper: 'clone',
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
		helper: 'clone',
        update: function(){
          $.ajax({
              type: 'post', 
              data: $(this).sortable('serialize'), 
              dataType: 'script', 
              complete: function(request){ },
              url: '/blocks/sort_blocks'});
          }
   });
	
   	$('#personal_groups').sortable({
		update: function(){
          $.ajax({
              type: 'post', 
              data: $(this).sortable('serialize'), 
              dataType: 'script', 
              complete: function(request){ },
              url: '/groups/sort_groups'});
          }
	});
	$('#professional_groups').sortable({
		update: function(){
          $.ajax({
              type: 'post', 
              data: $(this).sortable('serialize'), 
              dataType: 'script', 
              complete: function(request){ },
              url: '/groups/sort_groups'});
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
			window.location = '/forecast/index?start_date=' + dateText
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
			
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { starts_at: date, ends_at: '' }}),
				success: function(d) {
					window.location = '/forecast/index?business_hours=false&start_date=' + date
				}
			});
        }
    });
	
	if($('#start_date').length == 0) {
		$('.ui-datepicker-current-day').removeClass('ui-datepicker-current-day');
	}
	
	var initx;
	var created;
	
	$(".full_day_row").mousedown(function(e){
		
		if( $('.new_week_event').length == 0 ) {
		
			if( $('.event_hover').length == 0 ) {
		
				created = $('<div class="new_week_event"/>');
				$(this).append(created);
  
				initx = e.pageX - this.offsetLeft - 268 + $('.hours').scrollLeft();

				created.css({
					position: 'absolute',
					top: '0',
					left: initx
				});

				$(".full_day_row").bind("mousemove", resize);
		
			}
		} else if ( $('.event_hover').length == 0 ) {
				$('.new_week_event').remove();
		}
		
	});

	$(".full_day_row").mouseup(function(e){
		
		$(".full_day_row").unbind("mousemove", resize);
		var auth = $('#hidden_auth').val();
		var date = created.parent().attr('date');
		
		var startTime = (parseInt(created.css('left')) / 75).toFixed(2);
		shour = Math.floor(startTime.toString().split('.')[0]).toString();
		smin = Math.floor(startTime.toString().split('.')[1] * 0.6).toString();
		if(smin.length == 1) { smin = '0' + smin; };
		startTime = shour + ':' + smin + ':' + '00';
		var startsAt = date + " " + startTime;

		var endTime = ((parseInt(created.css('left')) + parseInt(created.css('width')) + 12)/ 75).toFixed(2);
		ehour = Math.floor(endTime.toString().split('.')[0]).toString();
		emin = Math.floor(endTime.toString().split('.')[1] * 0.6).toString();
		if(emin.length == 1) { emin = '0' + emin; };
		endTime = ehour + ':' + emin + ':' + '00';
		var endsAt = date + " " + endTime;
		
		
		var taskForm = 	'<form method="post" id="new_forecast_task" class="new_task" action="/tasks" accept-charset="UTF-8">' +
						'<input type="hidden" name="task[starts_at]" value="'+ startsAt +'" id="starts_at">' + 
						'<input type="hidden" name="task[ends_at]" value="'+ endsAt +'" id="ends_at">' +
						'<input autocomplete="off" id="new_task_input" name="task[task]" size="30" value="" type="text">' +
						'</form>';
		created.html(taskForm);
		created.find('#new_task_input').focus();
	}); 
	
	$('.new_week_event').live("mouseover", function() {
		$(this).addClass('event_hover');
	});
	$('.new_week_event').live("mouseout", function() {
		$(this).removeClass('event_hover');
	});
	
	var resize = function(e){
		var newx = e.pageX - this.offsetLeft - 268 + $('.hours').scrollLeft() - 12;
	    created.css({ 'width' : newx - initx });
	}
	
	$('.delete_task').live('click',function() {
		$(this).parent().parent().parent().remove();
	});
	
	$('.delete_event').live('click',function() {
		$(this).parent().parent().parent().remove();
	});
	
	$('#new_forecast_task').live('submit', function(e) {
		e.preventDefault();
		var startsAt = $(this).find('#starts_at').val();
		var endsAt = $(this).find('#ends_at').val();
		var task = $(this).find('#new_task_input').val();
		$.ajax({
			url: "/tasks",
			type: 'POST',
			data: $.param({forecast: 'yes', task : { starts_at: startsAt, ends_at: endsAt, task: task }}),
			success: function(d) { 
				

				
		 		created.addClass('week_event_wrap').removeClass('new_week_event');
				created.find('form').remove();
				created.html('<div class="week_event"><div class="start_time">' +
				'</div><div class="task"></div></div>');
				created.find('.task').text(task);
				created = '';
			}
		});
		return false;
	});
	
	$('.lock').live('click', function() {
		if($(this).hasClass('locked')) {
			$(this).removeClass('locked');
			$(this).parent().draggable( "enable" );
		} else {
			$(this).addClass('locked');
			$(this).parent().draggable( "disable" );
		}
	});
	
	$('.reminder').live('click', function() {
		var taskId = $(this).parent().parent().attr('id');
		$(this).addClass('reminded');
		$(this).html('<br> 5 minutes');
		$.ajax({
			url: "/tasks/" + taskId,
			type: 'PUT',
			data: $.param({task : { reminder: '5' }}),
			success: function(d) { 
			}
		});
	});
	
	$('.delete_reminder').live('click', function() {
		$('.add_reminder').text('Add Reminder');
	});
	
	$('#toggle_queue').live('click', function() {
		if($('#queue').hasClass('hidden')){
			$('#queue').show().removeClass('hidden');
			$('#cal_grid_wrap').css({ 'margin' : '0 200px 0 0' });
			$('#toggle_queue').removeClass('on');
		} else {
			$('#queue').hide().addClass('hidden');
			$('#cal_grid_wrap').css({ 'margin' : '0 0 0 0' });
			$('#toggle_queue').addClass('on');
		}
	});
	
	$('#set_range .edit').live('click', function(){
		$('#set_range .text').hide();
		$('#set_range .form').show();
	});
	

	$(".edit_tab").click( function() {
		$("#edit_action").remove();
		var left = $(this).offset().left;
		var top = $(this).offset().top;
		var href = $(this).attr('href');
		$('body').append('<div id="edit_action"></div>');
		$("#edit_action").dialog({
        	modal: false,
        	autoOpen: false,
        	height: 500,
        	width: 500,
			zIndex: 99999,
			position: [500, top],
        	open: function() {
        		$("#edit_action").load(href);
			},
			close: function() {
				$("#edit_action").remove();
			}
		}); 
		$("#edit_action").dialog("open");
    });

});
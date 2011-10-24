$(function() {
	
	$('#add_task').live('click', function() {
		$('#edit_action').remove();
		var height = 0;
		var width = 220;
		var y = $(this).offset().top + 20;
		var x = $(this).offset().left - width/2;
		id = $(this).attr('id');
		var href = '/tasks/new';
		$('<div id="edit_action"></div>').dialog({
        	modal: false,
        	autoOpen: true,
        	width: width,
			height: height,
			zIndex: 99999,
			position: [x, y],
        	open: function() {
        		$("#edit_action").load(href, function() {
					attach_datepicker();
				});
			},
			close: function() {
				$("#edit_action").remove();
			}
		}); 
	});
		
	$('.max_bg').live("mouseover", function() {
		$(this).draggable({
			handle: '.text',
			helper: 'clone',
			appendTo: 'body',
			zIndex: 99999,
			revert: 'invalid',
			revertDuration: 100,
			snap: '.ui-droppable',
			snapMode: 'inner',
			start: function(e,ui){
				$(this).hide();
				var width = $(this).parent().width();
				$(ui.helper).css( 'width', width );
			},
			revert: function(e,ui){
				$(this).show();
			}
		}).resizable({
			handles: 'n, s',
			containment: '.new_full_hour_row',
			start: function(e,ui){
				$(this).width('auto');
			},
			resize: function(e,ui){
				$(this).width('auto');
			},
			stop: function(e,ui){
				$(this).width('auto');

				var date = $(this).parent().attr('date');
				var top = ui.position.top + parseInt($('.new_week').scrollTop());
				var startsAt = date + ' ' +parseInt((top/75))+':'+parseInt(((top%75)*60)/75);
				var minDur = parseInt($(this).height() / 1.25);
				
				$(this).attr('mindur',minDur);
				
				calculate_times();
	
				$.ajax({
					url: "/tasks/" +  $(this).attr('id'),
					type: 'PUT',
					data: $.param({task : { starts_at: startsAt, min_duration: minDur }}),
					success: function(d) {  }
				});
				
				
			}
		});
	});

	
	$('.queue_day').droppable({
		tolerance: 'pointer',
        drop:function(event,ui){
			$(ui.draggable).attr('style','');
			$(ui.draggable).appendTo(this).show();
			calculate_times();
			date = $(this).attr('date');
			var taskId = $(ui.draggable).attr('id');
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { starts_at: date, queued: 'true', scheduled: 'false' }}),
				success: function(d) { }
			});
			
		}
	});
	
	$('.new_full_hour_row').droppable({
		tolerance: 'intersect',
        drop:function(event,ui){
			var height = $(ui.draggable).attr('mindur') ? ($(ui.draggable).attr('mindur')*1.25) : 75;
			var top = ui.position.top - 220 + parseInt($('.new_week').scrollTop());
			$(ui.draggable).css({ 'height' : height, 'top' : top });
			$(ui.draggable).appendTo(this).show();
			calculate_times();
			var startTime = parseInt((top/75))+':'+parseInt(((top%75)*60)/75);
			date = $(this).attr('date') + ' ' + startTime;
			var taskId = $(ui.draggable).attr('id');
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { starts_at: date, scheduled: 'true', queued: 'false' }}),
				success: function(d) { }
			});
			
		}
	});
	
	$('.items').droppable({
		tolerance: 'touch',
        drop:function(event,ui){
			$(ui.draggable).attr('style','');
			$(ui.draggable).appendTo(this).show();
			calculate_times();
			roleId = $(this).parent().attr('role');
			var taskId = $(ui.draggable).attr('id');
			$.ajax({
				url: "/tasks/" + taskId,
				type: 'PUT',
				data: $.param({task : { group_id: roleId, scheduled: 'false', queued: 'false' }}),
				success: function(d) { }
			});
			
		}
	});
	
	calculate_times();
	
	function calculate_times(){
		$('.new_full_hour_row').each(function(){
			var date = $(this).attr('date');
			var totalmin = 0;
			var totalmax = 0;
			var must = 0;
			var mindur = 0;
			var maxdur = 0;
			$(this).children('.max_bg').each(function(){
				mindur = parseInt($(this).attr('mindur'));
				totalmin = totalmin + mindur;
				maxdur = parseInt($(this).attr('maxdur'));
				totalmax = totalmax + maxdur;
				must = $(this).attr('must') == 'true' ? (must + mindur) : must;
			});
			$('.queue_day[date="'+date+'"]').children('.max_bg').each(function(){
				mindur = parseInt($(this).attr('mindur'));
				totalmin = totalmin + mindur;
				maxdur = parseInt($(this).attr('maxdur'));
				totalmax = totalmax + maxdur;
				must = $(this).attr('must') == 'true' ? (must + mindur) : must;
			});
			$('.time_wrap[date="'+date+'"]').find('.totalmin').text(totalmin);
			$('.time_wrap[date="'+date+'"]').find('.totalmax').text(totalmax);
			$('.time_wrap[date="'+date+'"]').find('.must').text(must);
		});
	}
	
});
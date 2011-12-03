$(document).ready(function() {

$('#day_plan_wrap ul.sortable').live("mouseover", function() {
	if (!$('ul.sortable').data("init")) {
		$('ul.sortable').data("init", true);
		$('ul.sortable').sortable({
		    connectWith: "ul.sortable",
		    placeholder: "drop_task",
			tolerance: "pointer",
		    toleranceElement: 'div',
			helper: "clone",
			appendTo: "body",
			cursorAt: { top: 17, left: 17 },
			scroll: false,
			start: function(event,ui){
				$(ui.helper).addClass('dragging_task');
			},
			stop: function(event,ui){
				var parentElement = ui.item[0].parentElement;
				var groupId = $(parentElement).parents('.outcome').first().find('.purpose_group').first().attr('group_id');
				var taskId = $(ui.item[0]).attr('id');
						
				if($(parentElement).hasClass('action_plan')) {
					var childParentId = $(parentElement).parents('li').first().attr('id');
					$.ajax({
						url: "/tasks/" + taskId,
						type: 'PUT',
						data: $.param({task : { parent_id: childParentId, group_id: groupId }})
					});
					var subTask = $(ui.item[0]).find('li');
					$(subTask).each(function(){
						taskId = $(this).attr('id');
						$.ajax({
							url: "/tasks/" +  taskId,
							type: 'PUT',
							data: $.param({task : { group_id: groupId }})
						});
					});
				} else {
					//$(ui.sender).sortable('cancel');
				}

				
			}

		});
	}
	
	$('#side_schedule .grid').droppable({
		tolerance: 'pointer',
		accept: '.task_wrap, .scheduled_task',
		over: function(event,ui){
		},
		drop: function(event,ui){
			if($(ui.draggable[0]).hasClass('task_wrap')){
				var taskId = $(ui.draggable[0]).attr('id');
				var top = ui.offset.top - 158 + parseInt($('#side_schedule').scrollTop());
				var date = $('#side_schedule .grid').attr('date');
				var startsAt = calculateStartsAt(date,top);
				$('ul.sortable').sortable('cancel');
				$("#scheduled_"+taskId).remove();
				var task = "<div class='scheduled_task' style='top:"+top+"px;' id='scheduled_"+taskId+"'>Loading</div>";
				$(this).append(task);
				$.ajax({
					url: "/task/schedule_task/" +  taskId,
					type: 'PUT',
					data: $.param({task : { starts_at: startsAt }})
				});
			}
		}
	});

});

$('.scheduled_task').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		$(this).draggable({
			axis: 'y',
			containment: 'parent',
			zIndex: 9999,
			opacity: 0.7,
			grid: [1, 15],
			stop: function(event,ui) {
				var taskId = $(this).attr('id');
				taskId = taskId.split('_');
				taskId = taskId[1];
				var top = ui.offset.top - 158 + parseInt($('#side_schedule').scrollTop());
				var date = $('#side_schedule .grid').attr('date');
				var startsAt = calculateStartsAt(date,top);
				$.ajax({
					url: "/task/schedule_task/" +  taskId,
					type: 'PUT',
					data: $.param({task : { starts_at: startsAt }})
				});
			}
		});
		$(this).resizable({
			handles: 's',
			stop: function(event,ui) {
				/*
				var taskId = $(this).attr('id');
				taskId = taskId.split('_');
				taskId = taskId[1];
				var duration = ui.size.height;
				$.ajax({
					url: "/task/schedule_task/" +  taskId,
					type: 'PUT',
					data: $.param({task : { min_duration: duration }})
				});
				*/
			
			}
		});
	}
});

});


function calculateStartsAt(date,top){
	var hours = padNumber(parseInt(parseInt(top)/60)); 
	var minutes = padNumber(parseInt(parseInt(top)%60));
	var startsAt = date+' '+hours+':'+minutes+':00';
	return startsAt;
}

function padNumber(number) {
     return (number < 10 ? '0' : '') + number
}

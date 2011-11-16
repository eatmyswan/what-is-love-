
$('#group .checkbox').live('click',function(){
	var checkbox = $(this);
	var task = $(this).parents('li').first();
	var taskId = task.attr('id');
	
	if(!task.parent().hasClass('in_outcome')){
		
		if(checkbox.hasClass('active')){
			checkbox.removeClass('active');
			$.ajax({
				url: "/tasks/" +  taskId,
				type: 'PUT',
				data: $.param({task : { complete: 'false' }}),
				success: function() { 
					task.fadeTo(100, 1.0).slideUp(200, function(){
						task.appendTo('#incomplete').slideDown(200);
						hideH3();
						});
					increaseCount();
					}
				});
		} else {
			$('h3.page').show();
			checkbox.addClass('active');
			$.ajax({
				url: "/tasks/" +  taskId,
				type: 'PUT',
				data: $.param({task : { complete: 'true' }}),
				success: function() { 
					task.fadeTo(100, 0.5).slideUp(200, function(){
						task.prependTo('#complete').slideDown(200);
						});
					decreaseCount();
					}
				});
		}
	} else {
		var outcomeId = task.parents('li').first().attr('id');
		if(checkbox.hasClass('active')){
				checkbox.removeClass('active');
				$.ajax({
					url: "/tasks/" +  taskId,
					type: 'PUT',
					data: $.param({task : { complete: 'false' }}),
					success: function() { 
						task.fadeTo(100, 1.0).slideUp(200, function(){
							task.appendTo('#'+outcomeId+'_incomplete').slideDown(200);
							hideOutcomeH3(outcomeId);
							});
						}
					});
			} else {
				$('#'+outcomeId+' h3.outcome_complete').show();
				checkbox.addClass('active');
				$.ajax({
					url: "/tasks/" +  taskId,
					type: 'PUT',
					data: $.param({task : { complete: 'true' }}),
					success: function() { 
						task.fadeTo(100, 0.5).slideUp(200, function(){
							task.prependTo('#'+outcomeId+'_complete').slideDown(200);
							});
						}
					});
			}
	}
});

$('#incomplete .star').live('click',function(){
	var star = $(this);
	var task = $(this).parents('li').first();
	var taskId = task.attr('id');
	if(star.hasClass('active')){
		star.removeClass('active');
		$.ajax({
			url: "/tasks/" +  taskId,
			type: 'PUT',
			data: $.param({task : { must: 'false' }}),
			success: function() { }
			});
	} else {
		star.addClass('active');
		$.ajax({
			url: "/tasks/" +  taskId,
			type: 'PUT',
			data: $.param({task : { must: 'true' }}),
			success: function() { }
			});
	}
});

$('#incomplete .delete').live('click',function(){
	var task = $(this).parents('li').first();
	var taskId = task.attr('id');
	//delete all li's inside
	var subTask = $(task).find('li');
	$(subTask).each(function(){
		subTaskId = $(this).attr('id');
		$.ajax({
			url: "/tasks/" +  subTaskId,
			type: 'DELETE'
		});
	});
	$.ajax({
		url: "/tasks/" +  taskId,
		type: 'DELETE',
		success: function() { 
			if(!task.find('.checkbox').first().hasClass('active')){
				decreaseCount();
			}
			task.fadeOut(200,function(){ task.remove(); });
		}
	});
});

$('#incomplete .edit').live('click',function(){
	$(this).hide();
	var task = $(this).parents('li').first();
	task.addClass('editing');
	task.find('.task').hide();
	task.find('.edit_task').removeClass('no_disp');
});
	
$('#incomplete .edit_done').live('click', function() {
	editingDone();
});

$('form.edit_task').live('submit',function(event){
	event.preventDefault();
	editingDone();	
	return false;
});

$('#incomplete .editing .target').live('click',function(){
	$(this).toggleClass('active');
});
	
$('#incomplete .target.active').live('click', function(){
	var task = $(this).parents('li').first();
	if(!task.hasClass('editing') && !$(this).hasClass('outcome')){
		task.addClass('outcome').find('.header').first().slideDown(200);
	} 
});

$('#incomplete .target.outcome').live('click', function(){
	var task = $(this).parents('li').first();
	task.removeClass('outcome').find('.header').first().slideUp(200);		
});


function editingDone() {
	var task = $('.editing');
	var taskId = task.attr('id');
	var taskText = task.find('input.edit_task_text').first().val();
	if(task.find('.target').hasClass('active')) {
		var taskOutcome = "true";
	} else {
		var taskOutcome = "false";
	}

	$.ajax({
		url: "/tasks/" +  taskId,
		type: 'PUT',
		data: $.param({task : { task: taskText, outcome: taskOutcome }}),
		success: function() { 
			}
		});
		
	task.removeClass('editing');
	task.find('.edit_task').addClass('no_disp');
	task.find('.task').show().text(taskText);
	task.find('.edit').attr('style','');
}

function increaseCount(){
	var countText = $('#categories .active').find('.count_text').first();
	count = parseInt( countText.text() ) + 1;
	countText.text(count);
}

function decreaseCount(){
	var countText = $('#categories .active').find('.count_text').first();
	count = parseInt( countText.text() ) - 1;
	countText.text(count);
}

function hideH3(){
	if($('#complete > li').size() == 0){
		$('h3.page').hide();
	}
}

function hideOutcomeH3(outcomeId){
	if($('#'+outcomeId+'_complete > li').size() == 0){
		$('#'+outcomeId+' h3.outcome_complete').hide();
	}
}

$('.checkbox').live('click',function(){
	var checkbox = $(this);
	var task = $(this).parents('li').first();
	var taskId = task.attr('id');
	
	if(!task.parent().hasClass('action_plan')){
		if(checkbox.hasClass('active')){
			checkbox.removeClass('active');
			$.ajax({
				url: "/tasks/" +  taskId,
				type: 'PUT',
				data: $.param({task : { complete: 'false' }}),
				success: function() { 
					task.fadeTo(100, 1.0).slideUp(200, function(){
						task.appendTo('#incomplete').slideDown(200);
						});
					increaseCount();
					}
				});
		} else {
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
		alert('completed a block task!');
	}
});

$('.star').live('click',function(){
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

$('.delete').live('click',function(){
	var task = $(this).parents('li').first();
	var taskId = task.attr('id');
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

$('.edit').live('click',function(){
	$(this).hide();
	var task = $(this).parents('li').first();
	task.addClass('editing');
	task.find('.task').hide();
	task.find('.edit_task').removeClass('no_disp');
});
	
$('.edit_done').live('click', function() {
	editingDone();
});

$('form.edit_task').live('submit',function(event){
	event.preventDefault();
	editingDone();	
	return false;
});

$('.editing .target').live('click',function(){
	$(this).toggleClass('active');
});
	
$('.target.active').live('click', function(){
	var task = $(this).parents('li').first();
	if(!task.hasClass('editing') && !$(this).hasClass('outcome')){
		task.addClass('outcome');
		task.find('.header').first().slideDown(200);		
	} 
});

$('.target.outcome').live('click', function(){
	var task = $(this).parents('li').first();
	task.removeClass('outcome');
	task.find('.header').first().slideUp(200);		
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
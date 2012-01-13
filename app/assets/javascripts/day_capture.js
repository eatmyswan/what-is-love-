$(document).ready(function() {

$('#capture_wrap ul.sortable .icon').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		$(this).cluetip({
			width: 170,
			positionBy: 'fixed',
			topOffset: 0,
			leftOffset: -18,
			activation: 'click',
			cluezIndex: 9999,
			waitImage: false,
			arrows: false,
			onHide: function() {
				$('#group_select').remove();
			},
			onShow: function() {
				$(document).bind('mousedown',function(e) {
					if(($(e.target).parents('#group_select').length == 0) && (e.target.id != 'group_select') && $('#group_select').length > 0){
						$(document).trigger('hideCluetip');	
					}
				});
			}
		});
	}
});

$('#group_select li').live("click", function() {
	var groupId = $(this).attr('id');
	var taskId = $(this).parent().attr('taskId');
	
	if($('#day_plan_wrap')) {
		$.ajax({
			url: "/tasks/" +  taskId,
			type: 'PUT',
			data: $.param({task : { group_id: groupId }, open : 'true'})
		});
	} else {
		var oldGroupId = $('#'+taskId).parents('.capture_group_wrap').first().attr('id');
	
		$.ajax({
			url: "/tasks/" +  taskId,
			type: 'PUT',
			data: $.param({task : { group_id: groupId }}),
			success: function() {
				$('#'+groupId).show();
				$('#'+taskId).fadeOut(300, function() {
					$(this).appendTo('#'+groupId+' > ul').fadeIn(300, function() {
						if ($('#'+oldGroupId+' ul').children().length == 0) $('#'+oldGroupId).hide();
					});
				});
			}
		});
	}
	
	$(document).trigger('hideCluetip');	
	$('#group_select').remove();
	
});

var stopCallback = true;

$('#capture_wrap ul.sortable, #side_plan').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
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
			receive: function(event,ui){
				//update the sender
				if(ui.sender){
					if($(ui.sender).hasClass('action_plan')){
						var order = $(ui.sender).sortable('serialize', {attribute: 'sort_id'});
						var parent_id = $(ui.sender).parents('li').first().attr('id');
						var group_id = $(ui.sender).parents('.capture_group_wrap_inbox, .capture_group_wrap').first().attr('id');
						var new_group_id = $(ui.item[0].parentElement).parents('.capture_group_wrap_inbox, .capture_group_wrap').first().attr('id');	
						$.ajax({
							url: "/tasks/"+ui.item[0].id, type: 'PUT',
							data: $.param({task : { parent_id: '', group_id: new_group_id } }),
							success: function(){
								if(order.length > 0) sortOldBlock(order,parent_id,group_id);	
							}
						});
					}
					else if ($(ui.sender).hasClass('add_to_plan')){
						//remove from plan
						$.ajax({
							url: "/tasks/"+ui.item[0].id, type: 'PUT',
							data: $.param({task : { plan: 'false', committed: 'false' }}),
							success: function() {
								var order = $(ui.sender).sortable('serialize', {attribute: 'sort_id'});
								if(order.length > 0) sortBlocks(order);
							}
						});
					} 
				}
			},
			remove: function(event,ui){
				//update the receiver
					var parentElement = ui.item[0].parentElement;
					if ($(parentElement).hasClass('add_to_plan')){
						$(ui.item[0]).removeClass('outcome');
						$(ui.item[0]).find('.header').hide();
						$.ajax({
							url: "/tasks/"+ui.item[0].id, type: 'PUT',
							data: $.param({task : { plan: 'true' }, nothing: 'true'})
						});
					} 
					else if(!$(parentElement).hasClass('action_plan')) {
						var group_id = $(parentElement).parents('.capture_group_wrap_inbox, .capture_group_wrap').first().attr('id');
						$.ajax({
							url: "/tasks/"+ui.item[0].id, type: 'PUT',
							data: $.param({task : { parent_id: '', group_id: group_id }})
						});
					}
			},
			stop: function(event,ui){
				//use this for sorting inside outcome
				//use this for going in outcome from same group
				if(!ui.sender && stopCallback == true){
					var parentElement = ui.item[0].parentElement;
					if($(parentElement).hasClass('action_plan')){
						var parent_id = $(parentElement).parents('li').first().attr('id');
						var group_id = $(parentElement).parents('.capture_group_wrap_inbox, .capture_group_wrap').first().attr('id');
						var order = $(parentElement).sortable('serialize', {attribute: 'sort_id'});
						sortInsideBlock(order,parent_id,group_id);
					} else if ($(parentElement).hasClass('add_to_plan')){
						var order = $(parentElement).sortable('serialize', {attribute: 'sort_id'});
						sortBlocks(order);
					} else {
						var order = $('#capture_wrap ul.sortable').sortable('serialize', {attribute: 'sort_id'});
							$.ajax({
								url: "/tasks/capture_sort",
								type: 'POST',
								data: order
							});
					}
				}
				captureEmpty();	
			}

		});
	}
});
			
});



function captureEmpty() {
	if($('#side_plan').children().length == 0) {
		$('#capture_empty').fadeIn(300);
	} else {
		$('#capture_empty').fadeOut(300);
	}
}

function calculateResultCount() {
	var count = $('#side_plan').children().length;
	$('.result_count_wrap .count').text(count);
}

function sortOldBlock(order,parent_id,group_id){
	$.ajax({
		url: "/tasks/sort", 
		type: 'POST', 
		data: order + '&parent_id=' + parent_id + '&group_id=' + group_id
	});
}
function sortInsideBlock(order,parent_id,group_id){
	$.ajax({
		url: "/tasks/sort",
		type: 'POST',
		data: order + '&parent_id=' + parent_id + '&group_id=' + group_id
	});
}
function sortBlocks(order){
	$.ajax({
		url: "/tasks/sort",
		type: 'POST',
		data: order,
		success: function(){
			renumberBlocks();
		}
	});
}

function renumberBlocks() {
	$('#side_plan li.outcome_ready').each(function(index){
		var count = index + 1;
		$(this).find('.task_number').first().text(count);
	});
}




$(document).ready(function() {

$('ul.sortable .icon').live("mouseover", function() {
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
	var oldGroupId = $('#'+taskId).parents('.capture_group_wrap').first().attr('id');
	
	$(document).trigger('hideCluetip');	
	$('#group_select').remove();
	
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
	
});

$('#capture_wrap ul.sortable').live("mouseover", function() {
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
			stop: function(event,ui){
				var parentElement = ui.item[0].parentElement;
				var groupId = $(parentElement).parents('.capture_group_wrap, .capture_group_wrap_inbox').first().attr('id');
				var taskId = $(ui.item[0]).attr('id');
				
				console.log(ui);
				
				if($(parentElement).hasClass('add_to_plan')){
					$(ui.item[0]).removeClass('outcome');
					$(ui.item[0]).find('.header').hide();
					$.ajax({
						url: "/tasks/" + taskId,
						type: 'PUT',
						data: $.param({task : { plan: 'true', outcome: 'true', parent_id: '' }})
					});
				} else {
				
					if($(parentElement).hasClass('action_plan')) {
						var childParentId = $(parentElement).parents('li').first().attr('id');
						$.ajax({
							url: "/tasks/" + taskId,
							type: 'PUT',
							data: $.param({task : { plan: 'false', parent_id: childParentId, group_id: groupId }})
						});
					} else {
						$.ajax({
							url: "/tasks/" + taskId,
							type: 'PUT',
							data: $.param({task : { plan: 'false', parent_id: '', group_id: groupId }})
						});
					}
		
					var subTask = $(ui.item[0]).find('li');
					$(subTask).each(function(){
						taskId = $(this).attr('id');
						$.ajax({
							url: "/tasks/" +  taskId,
							type: 'PUT',
							data: $.param({task : { group_id: groupId }})
						});
					});
				
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
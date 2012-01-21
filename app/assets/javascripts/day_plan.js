$(document).ready(function() {

$('#edit_plan').live('click', function(){

	if($('#day_plan_wrap').hasClass('planning')) {
		$('#day_plan_wrap').removeClass('planning');
		$('#day_plan_wrap').addClass('editing');
		$('.task_wrap').draggable('disable');
		$('.wc-day-column-inner').droppable('disable');
		$('ul.day_drop').droppable('disable');
		$('ul.sortable').sortable('enable');
		$('#input_wrap').slideDown(200);
		$('#edit_plan').addClass('active');
		$('#edit_plan').text('Done');
	} else {
		$('#day_plan_wrap').removeClass('editing');
		$('#day_plan_wrap').addClass('planning');
		$('.task_wrap').draggable('enable');
		$('.wc-day-column-inner').droppable('enable');
		$('ul.day_drop').droppable('enable');
		$('ul.sortable').sortable('disable');
		$('#input_wrap').slideUp(200);
		$('#edit_plan').removeClass('active');
		$('#edit_plan').text('Edit')
	}

});

var stopCallback = true;

$('#day_plan_wrap.editing ul.sortable').live("mouseover", function() {
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

			start: function(event,ui) {
				$(ui.helper).addClass('dragging_task');
			},

			stop: function(event,ui) {
				if(!ui.sender && stopCallback == true){
					var parent_id = $(ui.item[0].parentElement).parents('li').first().attr('id');
					var group_id = $(ui.item[0].parentElement).parents('li').first().attr('group_id');
					if(parent_id) {
						var order = $(ui.item[0].parentElement).sortable('serialize', {attribute: 'sort_id'});
						sortInsideBlock(order,parent_id,group_id);
					}
					else if ($(ui.item[0]).hasClass('outcome_ready')) {
						var order = $(this).sortable('serialize', {attribute: 'outcome_sort_id'});
						sortBlocks(order);
					}
				}
			},

			update: function(event,ui) {
				if(ui.sender){
					var taskId = ui.item[0].id;
					var order = $(ui.sender).sortable('serialize', {attribute: 'sort_id'});
					var new_order = $(ui.item[0].parentElement).sortable('serialize', {attribute: 'sort_id'});
					var parent_id = $(ui.sender).parents('li').first().attr('id');
					var new_parent_id = $(ui.item[0].parentElement).parents('li').first().attr('id');
					var group_id = $(ui.sender).parents('li').first().attr('group_id');
					var new_group_id = $(ui.item[0].parentElement).parents('li').first().attr('group_id');
					if(order.length > 0){
						sortOldBlock(taskId,order,parent_id,group_id,new_order,new_parent_id,new_group_id);
					} else {
						sortInsideBlock(new_order,new_parent_id,new_group_id)
					}
				}
			}

		});
		TM.capture.bindSortableScrollPatch( $('#group'), $(this) );
	}
});

$('#day_plan_wrap.planning li.task_wrap').live("mouseover", function() {
	if (!$(this).hasClass("ui-draggable")) {
		$(this).draggable({
			helper: 'clone',
			appendTo: 'body',
			zIndex: 9999,
			opacity: 0.7,
			cursorAt: { top: 17, left: 17 },
			scroll: false,
			start: function(event,ui){
				$(ui.helper).addClass('dragging_task');
			}
		});
	}
});


$('#day_plan_wrap .purpose_group').live("mouseover", function() {
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


function sortOldBlock(taskId,order,parent_id,group_id,new_order,new_parent_id,new_group_id){
	stopCallback = false;
	var nothing = new_parent_id ? 'true' : 'false';
	$.ajax({
		url: "/tasks/"+taskId,
		type: 'PUT',
		data: $.param({task : { parent_id: '' }, nothing: nothing}),
		success: function() {
			$.ajax({
				url: "/tasks/sort",
				type: 'POST',
				data: order + '&parent_id=' + parent_id + '&group_id=' + group_id,
				success: function() {
					stopCallback = true;
					if(new_parent_id) sortInsideBlock(new_order,new_parent_id,new_group_id)
				}
			});
		}
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
	$('li.outcome_ready').each(function(index){
		var count = index + 1;
		$(this).find('.task_number').first().text(count);
	});
}





});



$(document).ready(function() {
	
$('#plan_wrap ul.sortable').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);
		$(this).sortable({
			items: ".task_wrap",
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
			update: function(event,ui){
				var parentElement = ui.item[0].parentElement;
	
				if(!$(parentElement).hasClass('action_plan')){
					$('#incomplete > li.task_wrap').each(function(index){
						$.ajax({
							url: "/tasks/" + $(this).attr('id'),
							type: 'PUT',
							data: $.param({task : { sort: index, parent_id: "" }})
						});
					});
				}

				if($(parentElement).hasClass('action_plan')){
					var childParentId = $(parentElement).parents('li').first().attr('id');
					$(parentElement).children().each(function(index){
						$.ajax({
							url: "/tasks/" +  $(this).attr('id'),
							type: 'PUT',
							data: $.param({task : { sort: index, parent_id: childParentId }})
						});
					});
				}

				checkCount();
			}
		});
		
		$('.category').droppable({
			accept: ".task_wrap",
			hoverClass: "drop_hover",
			tolerance: "pointer",
			over: function (e,ui){
				console.log('over');
			},
			drop:function(event,ui){
				console.log('drop');
				ui.draggable.remove();
				var taskId = $(ui.draggable).attr('id');
				var catId = this.id;
				$.ajax({
					url: "/tasks/" +  taskId,
					type: 'PUT',
					data: $.param({task : { group_id: catId, parent_id: '' }}),
					success: function() { 
							var count = parseInt( $('#'+catId).find('.count_text').text() ) + 1;
							$('#'+catId).find('.count_text').text(count);
							checkCount();
					}
				});
		    }
		});
	}
});
	

$('#personal,#professional').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);	
		$(this).sortable({
			connectWith: '.connectedSortable',
			items: 'a',
			axis: 'y',
			forcePlaceholderSize: true,
			tolerance: 'pointer'
		});
	}
});

});

function checkCount(){
	var countText = $('#categories .active').find('.count_text').first();
	count = $('#incomplete > li').size();
	countText.text(count);
}
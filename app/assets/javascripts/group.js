$(document).ready(function() {

$('#plan_wrap ul.sortable').live("mouseover", function() {
	if (!$(this).data("init")) {
		$(this).data("init", true);

		$(this).sortable({
			items: ".task_wrap, .project_drop",
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

			receive: function(event,ui) {
				TM.log('HERE');
				//update the sender
				if(ui.sender && $(ui.sender).hasClass('action_plan')){
					var order = $(ui.sender).sortable('serialize', {attribute: 'sort_id'});
					var parent_id = $(ui.sender).parents('li').first().attr('id');
					$.ajax({
						url: "/tasks/"+ui.item[0].id, type: 'PUT',
						data: $.param({task : { parent_id: '' } }),
						success: function(){
							if(order.length > 0) {
								$.ajax({
									url: "/tasks/mylife_sort",
									type: 'POST',
									data: order + '&parent_id=' + parent_id
								});
							}
						}
					});
				}
			},

			change: TM.Capture.sortableScrollable( $('#group') ),

			update: function(event,ui) {
				var parentElement = ui.item[0].parentElement;
				if($(parentElement).hasClass('action_plan')){
					var parent_id = $(parentElement).parents('li').first().attr('id');
					var order = $(parentElement).sortable('serialize', {attribute: 'sort_id'});
					$.ajax({
						url: "/tasks/mylife_sort",
						type: 'POST',
						data: order + '&parent_id=' + parent_id
					});
					checkCount();
				}
			},

			stop: function(event,ui) {
				var order = $('#incomplete').sortable('serialize', {attribute: 'sort_id'});
				$.ajax({
					url: "/tasks/mylife_sort",
					type: 'POST',
					data: order
				});
			}
		});
		TM.Capture.bindSortableScrollPatch( $('#group'), $(this) );

		$('#plan_categories .category').droppable({
			accept: ".task_wrap",
			hoverClass: "drop_hover",
			tolerance: "pointer",
			drop:function(event,ui){
				TM.log('drop');
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
		
		$('.project_drop').droppable({
			accept: ".task_wrap",
			hoverClass: "drop_hover",
			tolerance: "pointer",
			drop:function(event,ui){
				ui.draggable.remove();
				var taskId = $(ui.draggable).attr('id');
				var projectId = $(this).attr('project_id');

				$.ajax({
					url: "/tasks/" +  taskId,
					type: 'PUT',
					data: $.param({task : { project_id: projectId, parent_id: '' }}),
					success: function() { 
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
			tolerance: 'pointer',
			containment: 'parent',
			stop: function(){
				var sort = $(this).sortable('serialize', {attribute: 'group_id'});
				$.ajax({
					url: "/groups/sort",
					type: 'POST',
					data: sort
				});
			}
		});
	}
});

});

function checkCount(){
	var countText = $('#categories .active').find('.count_text').first();
	count = $('#incomplete > li').size();
	countText.text(count);
}

$("ul").sortable({
    connectWith: "ul",
    placeholder: "drop_task",
	tolerance: "pointer",
    toleranceElement: 'div',
	helper: "clone",
	appendTo: "body",
	cursorAt: { top: 17, left: 17 },
	scroll: false,
	update: function(event,ui){
		var sortableResult =  $(this).sortable('toArray');

		$(sortableResult).each(function(index){
			$.ajax({
				url: "/tasks/" + this,
				type: 'PUT',
				data: $.param({task : { sort: index, parent_id: '' }})
			});
		});
		
		var parentElement = ui.item[0].parentElement;

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

	}
});

	
$('.category').droppable({
	accept: ".connectedSortable li",
	hoverClass: "drop_hover",
	tolerance: "pointer",
	drop:function(event,ui){
		ui.draggable.remove();
		var taskId = $(ui.draggable).attr('id');
		var catId = this.id;
		$.ajax({
			url: "/tasks/" +  taskId,
			type: 'PUT',
			data: $.param({task : { group_id: catId }}),
			success: function() { 
					var count = parseInt( $('#'+catId).find('.count_text').text() ) + 1;
					$('#'+catId).find('.count_text').text(count);
					count = parseInt( $('#categories .active').find('.count_text').text() ) - 1;
					$('#categories .active').find('.count_text').text(count);
			}
		});
    }
});

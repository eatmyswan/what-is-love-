$('#toggle_personal').live('click',function(){
	if($(this).hasClass('down')){
		$(this).removeClass('down');
		$('#personal').slideDown();
	} else {
		$(this).addClass('down');
		$('#personal').slideUp();
	}
});

$('#add_professional').live('click', function(){
	$('#professional').slideDown();
	$('#toggle_professional').removeClass('down');
	$('#new_professional').slideDown(200);
});

$('#toggle_professional').live('click',function(){
	if($(this).hasClass('down')){
		$(this).removeClass('down');
		$('#professional').slideDown();
	} else {
		$(this).addClass('down');
		$('#professional').slideUp();
	}
});

$('#add_personal').live('click', function(){
	$('#personal').slideDown();
	$('#toggle_personal').removeClass('down');
	$('#new_personal').slideDown(200);
});

$('.category .cover input[type=file]').live('change focus click', function() {
	 if($(this).val() !== '') {
		$(this).next('.file_field_cover').addClass('added');
	 }
});

$('.new_category .cancel').live('click',function(){
	var newCategory = $(this).parents('.new_category').first();
	clearForm(newCategory);
});

$('.new_category .edit_done').live('click',function(){
	$(this).parents('form').first().trigger('submit');
});

$('.new_group').live('submit',function(){
	var newCategory = $(this).parents('.new_category').first();
	clearForm(newCategory);
});

$('#plan_categories .category .edit').live('click',function(){
	event.preventDefault();
	var category = $(this).parents('.category').first();
	var categoryId = category.attr('id');
	var categoryClass = category.attr('class');
	var href = category.attr('href');
	category.replaceWith($('<div href="'+href+'" class="'+ categoryClass +' editing" id="'+categoryId+'">' + category.html() + '</div>'));
	return false;
});

$('#plan_categories .category .edit_done').live('click',function(){
	$('.edit_group').trigger('submit');
});

$('#plan_categories .edit_group').live('submit',function(){

});


$('#plan_categories .category .delete').live('click',function(event){
	event.preventDefault();
	var category = $(this).parents('.category').first();
	$.ajax({
		url: "/groups/" +  category.attr('id'),
		type: 'DELETE',
		success: function() { 
			category.fadeOut();
		}
	});
	return false;
});

function clearForm(newCategory){
	$(newCategory).find('input[type=file]').val('');
	$(newCategory).find('input[type=text]').val('New category...');
	$(newCategory).find('.file_field_cover').removeClass('added');
	$(newCategory).slideUp(200);
}
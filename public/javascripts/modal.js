$(function() {
	
	
	$('.max_bg').live('dblclick', function(e) {
		$('#edit_action').remove();
		var height = 300;
		var width = 220;
		var y = $(this).offset().top - height/2 + 95;
		var x = $(this).offset().left - width - 20;
		id = $(this).attr('id');
		var href = '/tasks/'+ id +'/edit';
		$('<div id="edit_action"></div>').dialog({
        	modal: false,
        	autoOpen: true,
        	width: width,
			zIndex: 99999,
			position: [x, y],
        	open: function() {
        		$("#edit_action").load(href, function() {
					attach_datepicker();
				});
			},
			close: function() {
				$("#edit_action").remove();
			}
		}); 
	});
	
	$('#color_picker').live('click', function(){
		$(this).parent().find('.popup').show();
	});
	
	$('.select_color').live('click', function() {
		var color = $(this).attr('color');
		$('#color_picker').css('background',color);
		$('#task_color').val(color);
		$(this).parent().hide();
	});
	
	$('.category_select').live('click', function() {
		$(this).parent().find('.popup').show();
	});
	
	$('.category_list').live('click', function() {
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		var catId = $(this).attr('id');
		$('#task_group_id').val(catId);
		var html = $(this).html();
		$('#done_modal').attr('category',catId);
		$(this).parent().parent().find('.category_name').html(html);
		$(this).parent().hide();
	});
	
	$('#add_contact').live('click', function() {
		var url = $(this).attr("href");
		window.open(url, 'windowName', 'location=0,status=0,toolbar=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=340,width=560');
	});
	
	function attach_datepicker() {
		var date = $('#task_starts_at').val().split('T');
		$('#calendar').datepicker({
			dateFormat: 'yy-mm-dd',
			dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			defaultDate: date[0],
			showOtherMonths: true,
			onSelect: function(dateText, inst) {
				$('#select_date').attr('date',dateText);
			}
		});
	}
	
	$('#set_date').live('click', function(){
		$('#calendar').show();
	});
	
	$('#set_min_duration').live('click', function(){
		$('#min_duration').show();
	});
	
	$('.set_min_duration').live('click', function() {
		var dur = $(this).attr('dur');
		$('#task_min_duration').val(dur);
		$('#set_min_duration').text($(this).text());
		$(this).parent().hide();
	});
	
	$('#set_max_duration').live('click', function(){
		$('#max_duration').show();
	});
	
	$('.set_max_duration').live('click', function() {
		var dur = $(this).attr('dur');
		$('#task_max_duration').val(dur);
		$('#set_max_duration').text('- '+$(this).text());
		$(this).parent().hide();
	});
	
	$('#select_date').live('click', function() {
		var dateText = $(this).attr('date');
		var date = dateText.split('-');
		$('#set_date').text(date[1]+'/'+date[2]+'/'+date[0]);
		$('#task_starts_at').val(dateText);
		$('#calendar').hide();
		$('#reminders_wrap').show();
	});
		
	$('#no_date').live('click', function() {
		$('#calendar').hide();
		$('#set_date').text('Set date');
		$('#task_starts_at').val('');
	});
	
	$('.add_reminder').live('click', function() {
		$('#reminder_popup').show();
	});
	
	$('.set_reminder').live('click', function() {
		var dur = $(this).attr('dur');
		$('.add_reminder').before('<div>'+ $(this).text() +' <a class="delete_reminder">x</a><input type="hidden" name="reminders[]" value="'+dur+'"></div>');
		$('#reminder_popup').hide();
	});
	
	$('.delete_reminder').live('click', function() {
		$(this).parent().remove();
	});
	
	$('.delete_note').live('click', function() {
		$(this).parent().parent().remove();
		notes_index();
	});
	
	$('#notes_wrap').live('click',function() {
		$('#new_note_label').remove();
		$('#new_note').focus();
	});
	
	$('#new_note').live('blur',function() {
		if(this.value.length > 2){
			insert_note(this.value);
			$(this).val('');
		}
	});
	
	$('#new_note').live('keyup',function(e) {
		e.preventDefault;
		if (e.keyCode == 13) {
			insert_note(this.value);
			$(this).val('');
		}
	});
	
	function insert_note(note) {
		var note = '<div class="note_wrap"><div class="index"></div><div class="note">'+ note +'<input type="hidden" name="notes[]" value="'+ note +'"> <a class="delete_note">x</a></div></div>';
		$('#notes').append(note);
		notes_index();
	}
	
	function notes_index(){
		$('#notes .note_wrap').each(function(index){
			$(this).find('.index').text(index + 1);
		});
	}
	
	$('#done_modal').live('click',function() {
		var catId = $(this).attr('category');
		if(catId){
			var taskId = $(this).attr('task');
			var task = $('#'+taskId).clone();
			$('#'+taskId).remove();
			$('[role="'+catId+'"]').find('.items').append(task);
		}
		$(this).parent().submit();
		$('#edit_action').remove();
	});
	
	$('#cancel_modal').live('click',function() {
		$('#edit_action').remove();
	});
});
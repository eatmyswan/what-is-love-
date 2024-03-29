$(document).ready(function() {


Galleria.ready(function (a,b) {
	var gallery = this;

	gallery.bind('fullscreen_enter', function () {
		$(document.body).addClass('fullscreen-gallery');
		return true;
	});
	gallery.bind('fullscreen_exit', function () {
		$(document.body).removeClass('fullscreen-gallery');
		return true;
	});
});

$('.goal .delete').live('click',function(){
	$(this).parent().fadeOut(300,function(){
		$(this).remove();
	});
});

$('#vision').live('click',function(){
	$(this).addClass('active');
	$('#plan').removeClass('active');
	$('#plan_wrap').hide();
	$('#vision_wrap').show();
});

$('#plan').live('click',function(){
	$(this).addClass('active');
	$('#vision').removeClass('active');
	$('#plan_wrap').show();
	$('#vision_wrap').hide();
});

$('.add_goal').live('click',function(){
	var form_wrap = $(this).parent().parent().find('.form_wrap');
	$(form_wrap).slideDown(100).find('[type=text]').focus();
});

$('.goals_wrap').sortable({
	items: '.goal',
	axis: 'y'
});

$('#top .cover').live('hover', function () {
	$('#top .gravatar_cover').show();
});
$('#top .gravatar_cover').live('mouseleave', function () {
	$('#top .gravatar_cover').hide();
});

$('#vision_wrap .edit').live('click', function(){
	$(this).parent().addClass('editing');
});

$('#vision_wrap .edit_done').live('click', function() {
	$('#vision_wrap .editing form').submit();
});

$('#vision_wrap .editing form').live('submit', function() {
	$(this).find('text').first().text($(this).find('input').first().val());
	$(this).parent().removeClass('editing');
	return false;
});


TM.bindFancybox('.vision_image, #create_v_group', {
	overlayOpacity : 0.7
});

$('#vision_wrap .delete_img').live('click', function(){
	var imgWrap = $(this).parents('.image_wrap').first();
	imgWrap.fadeOut(300,function(){
		imgWrap.remove();
	});
});

});
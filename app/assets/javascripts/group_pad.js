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
module ApplicationHelper
  
  def controller?(*controller)
    controller.include?(params[:controller])
  end

  def action?(*action)
    action.include?(params[:action])
  end
  
  def id?(*id)
    id.include?(params[:id])
  end
  
  def start_to_minutes(start)
    hours = start.strftime('%H').to_i * 60
    minutes = start.strftime('%M').to_i
    time = hours + minutes
    "#{time}"
  end

  def uploadify_group(group)
    session_key_name = Rails.application.config.session_options[:key]
    %Q{
      <script type='text/javascript'>
        var _uploadifyOptions = {
            script          : '#{ group_path(group) }',
            fileDataName    : 'image[image]',
            uploader        : '#{ asset_path 'uploadify.swf' }',
            cancelImg       : '',
            fileDesc        : 'Images',
            fileExt         : '*.png;*.jpg;*.gif',
            sizeLimit       : #{10.megabytes},
            queueSizeLimit  : 1,
            multi           : true,
            auto            : true,
            wmode           : 'transparent',
            hideButton      : true,
            height          : 150,
            width           : 159,
            queueID       : 'queue',
            scriptData      : {
              '_http_accept': 'application/javascript',
              '#{session_key_name}' : encodeURIComponent('#{u(cookies[session_key_name])}'),
              'authenticity_token'  : encodeURIComponent('#{u(form_authenticity_token)}'),
              '_method' : 'PUT'
            },
            onComplete      : function(a, b, c, response){ eval(response) }
          };
      </script>
    }.gsub(/[\n ]+/, ' ').strip.html_safe
  end

end

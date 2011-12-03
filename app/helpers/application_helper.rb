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
  
  def starts_at_to_minutes(starts_at)
    hours = starts_at.strftime('%H').to_i * 60
    minutes = starts_at.strftime('%M').to_i
    time = hours + minutes
    "#{time}"
  end
  
  def uploadify_user
   session_key_name = Rails.application.config.session_options[:key]
   %Q{
      <script type='text/javascript'>
        $(document).ready(function() {
          $('#upload').uploadify({
            script          : '#{ user_images_path(current_user) }',
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
              'authenticity_token'  : encodeURIComponent('#{u(form_authenticity_token)}')
            },
            onComplete      : function(a, b, c, response){ eval(response) }
          });
        });
      </script>
    }.gsub(/[\n ]+/, ' ').strip.html_safe
  end
  
  def uploadify_group
    session_key_name = Rails.application.config.session_options[:key]
    %Q{
      <script type='text/javascript'>
        $(document).ready(function() {
          $('#upload').uploadify({
            script          : '#{ group_path(@group) }',
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
          });
        });
      </script>
    }.gsub(/[\n ]+/, ' ').strip.html_safe
  end

end

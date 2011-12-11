class ApplicationController < ActionController::Base
  protect_from_forgery
  
  layout proc{ |c| c.request.xhr? ? false : "application" }
  
  layout :layout_by_resource

  def layout_by_resource
    if devise_controller?
      "invite"
    else
      "application"
    end
  end
  
end
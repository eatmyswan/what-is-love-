class ApplicationController < ActionController::Base
  protect_from_forgery
  
  layout proc{ |c| c.request.xhr? ? false : "application" }
  
  layout :layout_by_resource

  def layout_by_resource
    if devise_controller? && !user_signed_in?
      "invite"
    elsif devise_controller? && user_signed_in?
      false
    else
      "application"
    end
  end
  
end
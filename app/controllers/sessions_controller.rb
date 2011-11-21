class SessionsController < ApplicationController
  
  def create
    auth = request.env["omniauth.auth"]
    user = User.first(conditions: { provider: auth["provider"], uid: auth["uid"]}) || User.create_with_omniauth(auth)
    session[:user_id] = user.id
    redirect_to root_url
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end
  
  def failure
    render :text=>request.env["omniauth.auth"].to_yaml
  end

end
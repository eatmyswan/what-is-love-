class HomeController < ApplicationController

  def index
    if session[:user_id]
      redirect_to account_settings_path
    end
  end

end
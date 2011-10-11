class HomeController < ApplicationController

  def index
    if session[:user_id]
      redirect_to groups_path
    end
  end
  
  def masterplan
    render :layout => false
  end

end
class HomeController < ApplicationController

  def index
    if user_signed_in?
      @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
      @personal = Group.where(user_id: current_user.id).and(personal: true)
      @professional = Group.where(user_id: current_user.id).and(professional: true)
      render 'my_life'
    else
      render 'index', :layout => 'invite'
    end

  end

end
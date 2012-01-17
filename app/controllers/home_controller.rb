class HomeController < ApplicationController

  def index
    if user_signed_in?
      @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
      @personal = Group.where(user_id: current_user.id).and(personal: true).order_by([:sort, :asc]) 
      @professional = Group.where(user_id: current_user.id).and(professional: true).order_by([:sort, :asc])
      @unread_count = current_user.unread_notices.count
      render 'my_life'
    else
      render 'index', :layout => 'invite'
    end
  end

end
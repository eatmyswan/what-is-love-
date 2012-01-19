class HomeController < ApplicationController
  layout 'invite'

  def index
    if user_signed_in?
      @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
      @personal = Group.where(user_id: current_user.id).and(personal: true).order_by([:sort, :asc])
      @professional = Group.where(user_id: current_user.id).and(professional: true).order_by([:sort, :asc])
      @unread_count = current_user.unread_notices.count
      render 'my_life', :layout => 'application'
    else
      render 'index'
    end
  end

  def tour
    @body_class = 'fs18'
  end

  def our_customers
  end

  def mobile
  end

  def faq
    @body_class = 'fs14'
  end

end
class HomeController < ApplicationController
  layout 'invite'

  def index
    if user_signed_in?
      @inbox = current_user.inbox
      @personal = current_user.groups.personal.order_by([:sort, :asc])
      render 'my_life', :layout => 'application'
    else
      render 'index'
    end
  end

  def ajax_new
    if user_signed_in?
      render 'sessions/ajax-sign-in', :layout => false
    else
      redirect_to new_user_session_path
    end
  end

  def tour
    @body_class = 'fs18'
  end

  def our_customers
  end

  def mobile
    @invite = Invite.new :type => :mobile
  end

  def faq
    @body_class = 'fs14'
  end

end
class NotificationsController < ApplicationController
  def latest
    @notifications = current_user.notifications
    render :layout => false
  end

end

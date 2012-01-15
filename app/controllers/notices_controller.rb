class NoticesController < ApplicationController
  def latest
    @notices = current_user.notices
    render :layout => false
  end

  def latest_panel
    @notices = current_user.notices
  end

end

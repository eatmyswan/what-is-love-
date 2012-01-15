class NoticesController < ApplicationController
  def latest
    @notices = current_user.notices.desc :created_at
    render :layout => false
  end

  def latest_panel
    @notices = current_user.notices.desc :created_at
  end

end

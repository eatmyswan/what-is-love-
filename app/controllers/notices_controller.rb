class NoticesController < ApplicationController
  def latest
    @notices = current_user.notices
    render :layout => false
  end

end

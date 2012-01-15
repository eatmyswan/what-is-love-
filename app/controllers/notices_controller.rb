class NoticesController < ApplicationController
  def latest
    @notices = current_user.notices.desc :created_at
    @notices = @notices.reject {|n| n.subject.nil? || n.target.nil?}
    render :layout => false
  end

  def latest_panel
    @notices = current_user.notices.desc :created_at
    @notices = @notices.reject {|n| n.subject.nil? || n.target.nil?}
  end

end

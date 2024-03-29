class NoticesController < ApplicationController

  before_filter :authenticate_user!

  def latest
    @notices = current_user.notices.desc :created_at
    @notices = @notices.reject {|n| n.subject.nil? || n.target.nil?}

    current_user.read_notices!
    @unread_count = current_user.unread_notices.count

    render :layout => false
  end

  def latest_panel
    @notices = current_user.notices.desc :created_at
    @notices = @notices.reject {|n| n.subject.nil? || n.target.nil?}
  end

  def unread_count
    render :json => { :unreadCount => current_user.unread_notices.count }
  end

end

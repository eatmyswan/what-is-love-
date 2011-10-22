class WeeksController < ApplicationController
  
  def index
    require 'time_diff'
    
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal').order_by([:created_at, :asc])
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional').order_by([:created_at, :asc])
    
    @date = params[:start_date] ? params[:start_date].to_time() : Time.now()
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date + 6
    @events = Task.where(:starts_at.gte => @date).entries
    
  end
  
  def new
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal').order_by([:created_at, :asc])
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional').order_by([:created_at, :asc])
    
    @date = Date.today.beginning_of_week
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date + 6
    @tasks = Task.where(:starts_at.gte => @date).entries
  end
  
end
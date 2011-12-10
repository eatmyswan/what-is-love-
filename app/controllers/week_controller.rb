class WeekController < ApplicationController
  
  def json
    tasks_json = Task.where(:start.gte => params[:start_date], :start.lt => params[:end_date]).and(scheduled: true)
    render :json => tasks_json
  end
  
  def outcome
    task = Task.find(params[:id])
    render :text => "#{task.sort} #{task.title}"
  end
  
  def group
    task = Task.find(params[:id])
    @group = task.group
    render :partial => "/tasks/wc_group", :layout => false
  end
  
  def capture    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @groups = Group.where(user_id: current_user.id).and(:master_title.ne => nil)
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(parent_id: nil).and(plan: true).and(:group_id.ne => nil).order_by([:sort, :asc])
  end
  
  def plan    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(parent_id: nil).and(plan: true).and(:group_id.ne => nil).order_by([:sort, :asc])
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @tasks = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(committed: true)
    @appts = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(group_id: nil)
  end
  
  def forecast    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @tasks = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(committed: true)
    @appts = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(group_id: nil)
  end
  
  def side
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @tasks = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(committed: true)
    @appts = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(group_id: nil)
    render :partial => "committed", :layout => false
  end
  
end
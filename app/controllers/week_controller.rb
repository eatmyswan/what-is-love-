class WeekController < ApplicationController
  
  def json
    tasks_json = Task.where(:start.gte => params[:start_date], :start.lt => params[:end_date]).and(user_id: current_user.id).and(scheduled: true)
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
    @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    @groups = Group.any_of({ personal: true }, { professional: true }).and(user_id: current_user.id)
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(parent_id: nil).and(plan: true).and(:group_id.ne => nil).order_by([:sort, :asc])
  end
  
  def plan    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(parent_id: nil).and(plan: true).and(:group_id.ne => nil).order_by([:sort, :asc])
    @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    @tasks = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(committed: true)
    @appts = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(group_id: nil)
  end
  
  def forecast    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @tasks = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(committed: true)
    @appts = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(group_id: nil)
    @size = params[:size] ? params[:size] : 15
  end
  
  def side
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @tasks = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(committed: true)
    @appts = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(group_id: nil)
    render :partial => "committed", :layout => false
  end
  
end
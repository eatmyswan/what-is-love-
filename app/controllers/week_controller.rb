class WeekController < ApplicationController
  
  def json
    @tasks_json = Task.where(:start.gte => params[:start_date], :start.lt => params[:end_date]).and(scheduled: true)
    render :json => @tasks_json
  end
  
  def capture    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @groups = Group.where(user_id: current_user.id).and(:master_title.ne => nil)
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(parent_id: nil).and(plan: true).order_by([:sort, :asc])
  end
  
  def plan    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
    @end_date = @start_date + 6.days
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(parent_id: nil).and(plan: true).order_by([:sort, :asc])
  end
  
  def forecast    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day).beginning_of_week
  end
  
end
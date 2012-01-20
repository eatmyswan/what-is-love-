class DayController < ApplicationController
  
  def capture    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date + 1.day
    @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    @groups = Group.any_of({ personal: true }, { professional: true }).and(user_id: current_user.id).order_by([:sort, :asc])
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(plan: true).and(week: false).and(:group_id.ne => nil).order_by([:sort, :asc])
  end
  
  def plan    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date + 1.day
    @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(plan: true).and(week: false).and(:group_id.ne => nil).order_by([:sort, :asc])
  end
  
  def schedule    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @size = params[:size] ? params[:size] : 15
  end
  
  def side
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day)
    render :partial => "side", :layout => false
  end
  
  def load_plan
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date + 1.day
    @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(user_id: current_user.id).and(parent_id: nil).and(plan: true).and(week: false).order_by([:sort, :asc])
    render :partial => "load_plan", :layout => false
  end
  
end
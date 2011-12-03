class DayController < ApplicationController
  
  def capture    
    @date = params[:start_date].to_time().at_midnight
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @date + 1.day
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @groups = Group.where(user_id: current_user.id).and(:master_title.ne => nil)
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(parent_id: nil).and(plan: true).order_by([:sort, :asc]);
  end
  
  def plan    
    @date = params[:start_date].to_time()
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @date + 1.day
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @plans = Task.where(:start.gte => @start_date, :start.lt => @end_date).and(parent_id: nil).and(plan: true).order_by([:sort, :asc]);
  end
  
  def schedule    
    @date = params[:start_date].to_time()
    @start_date = Date.new(@date.year, @date.month, @date.day)
  end
  
  def side
    @date = params[:start_date].to_time()
    @start_date = Date.new(@date.year, @date.month, @date.day)
    render :partial => "side", :layout => false
  end
  
end
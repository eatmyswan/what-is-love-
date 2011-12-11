class MonthController < ApplicationController
  
  def json
    @tasks_json = Task.where(:start.gte => params[:start_date], :start.lt => params[:end_date]).and(user_id: current_user.id).and(scheduled: true)
    render :json => @tasks_json
  end
  
  def index    
    
  end

end
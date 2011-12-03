class WeeksController < ApplicationController
  
  def json
    @tasks_json = Task.where(:start.gte => params[:start_date], :start.lt => params[:end_date]).and(scheduled: true)

    render :json => @tasks_json
  end
  
  def index


  end
  
  def day  
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @personal = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional = Group.where(user_id: current_user.id).and(master_title: 'Professional')
      
    @date = params[:start_date].to_time()
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date
    @tasks = Task.where(:start.gte => @date).and(user_id: current_user.id).entries
  end
  
  def month
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @personal = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional = Group.where(user_id: current_user.id).and(master_title: 'Professional')
      
    @date = params[:start_date].to_time().beginning_of_month
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date.end_of_month
    @tasks = Task.where(:start.gte => @date).and(user_id: current_user.id).entries
  end
  
end
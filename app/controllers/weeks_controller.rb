class WeeksController < ApplicationController
  
  def index
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @personal = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional = Group.where(user_id: current_user.id).and(master_title: 'Professional')
      
    @date = params[:start_date].to_time().beginning_of_week - 1.day
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date + 6.days
    @tasks = Task.where(:starts_at.gte => @date).entries
  end
  
  def day  
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @personal = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional = Group.where(user_id: current_user.id).and(master_title: 'Professional')
      
    @date = params[:start_date].to_time()
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date
    @tasks = Task.where(:starts_at.gte => @date).entries
  end
  
  def month
    @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
    @personal = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional = Group.where(user_id: current_user.id).and(master_title: 'Professional')
      
    @date = params[:start_date].to_time().beginning_of_month
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @end_date = @start_date.end_of_month
    @tasks = Task.where(:starts_at.gte => @date).entries
  end
  
end
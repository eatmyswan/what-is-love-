class ForecastController < ApplicationController
  
  def index
    require 'time_diff'
    
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal').order_by([:created_at, :asc])
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional').order_by([:created_at, :asc])
    
    @date = params[:start_date].to_time() 
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @range = params[:range] ? params[:range].to_i : 7
    @end_date = @start_date + @range
    @events = Task.where(:starts_at.gte => @date).entries
    
  end
  
end
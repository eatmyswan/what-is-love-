class ForecastController < ApplicationController
  
  def index
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal').order_by([:created_at, :asc])
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional').order_by([:created_at, :asc])
    
    @date = Time.parse("#{params[:start_date]}")
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @events = Task.where(:starts_at.gte => @date).entries
    
  end
  
end
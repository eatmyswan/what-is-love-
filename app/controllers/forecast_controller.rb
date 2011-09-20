class ForecastController < ApplicationController
  
  def index    
    @date = Time.parse("#{params[:start_date]}")
    @start_date = Date.new(@date.year, @date.month, @date.day)
    @events = Task.all.entries
    
  end
  
end
class GoalsController < ApplicationController
  

  def create
    @user = User.find(params[:user_id])
    goal = Goal.new(params[:goal])
    @user.goals << goal
    @user.save

    redirect_to('/users')
  end


end
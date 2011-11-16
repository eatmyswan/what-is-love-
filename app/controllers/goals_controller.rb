class GoalsController < ApplicationController
  
  def create
    if(params[:group_id])
      @group = Group.find(params[:group_id])
      goal = Goal.new(params[:goal])
      @group.goals << goal
      @group.save
      respond_to do |format|
        format.js { render :template => 'groups/update', :layout => false }
      end
    elsif(params[:user_id])
      @user = User.find(params[:user_id])
      goal = Goal.new(params[:goal])
      @user.goals << goal
      @user.save
      respond_to do |format|
        format.js { render :template => 'users/update', :layout => false }
      end
    end


  end

end
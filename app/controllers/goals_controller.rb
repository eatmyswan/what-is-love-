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
  
  def destroy
    if(params[:group_id])
      @group = Group.find(params[:group_id])
      @goal =  @group.goals.find(params[:id])
    elsif(params[:user_id])
      @user = User.find(params[:user_id])
      @goal =  @user.goals.find(params[:id])
    end
    
    @goal.destroy
    render :nothing => true
  end

end
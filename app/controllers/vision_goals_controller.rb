class VisionGoalsController < ApplicationController
  
  def create
    v_group = VisionGroup.find(params[:vision_group_id])
    goal = Goal.new(params[:vision_goal])
    v_group.vision_goals << goal
    v_group.save
    @user = @group = v_group.dreamer

    template = 'groups/update'
    template = 'users/update' if v_group.dreamer.is_a? User
    respond_to do |format|
      format.js { render :template => template, :layout => false }
    end
  end
  
  def destroy
    if params[:vision_group_id]
      group = VisionGroup.find params[:vision_group_id]
    elsif params[:user_id]
      group = @user = User.find(params[:user_id])
    end
    goal = group.vision_goals.find params[:id]
    goal.destroy
    render :nothing => true
  end

end
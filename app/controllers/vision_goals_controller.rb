class VisionGoalsController < ApplicationController

  layout false

  def create
    v_group = VisionGroup.find(params[:vision_group_id])
    goal = Goal.new(params[:vision_goal])
    v_group.vision_goals << goal
    v_group.save
    @group = v_group.group

    render 'groups/update'
  end

  def destroy
    group = VisionGroup.find params[:vision_group_id]
    goal = group.vision_goals.find params[:id]
    goal.destroy
    render :nothing => true
  end

end
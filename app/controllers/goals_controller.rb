class GoalsController < ApplicationController
  
  def create
    @group = Group.find(params[:group_id])
    goal = Goal.new(params[:goal])
    @group.goals << goal
    @group.save

    redirect_to(group_long_term_path(@group))
  end

end
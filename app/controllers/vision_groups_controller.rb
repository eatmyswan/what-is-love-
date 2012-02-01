class VisionGroupsController < ApplicationController

  layout false

  def show
    @v_group = VisionGroup.find(params[:id])
    @group = Group.find params[:group_id]
  end

  def new
    @v_group = VisionGroup.new
    @group = Group.find params[:group_id]
  end

  def edit
    @v_group = VisionGroup.find(params[:id])
  end

  def create
    @v_group = VisionGroup.new(params[:vision_group])

    @group = Group.find params[:group_id]
    @v_group.idx = @group.vision_groups.count
    @v_group.group = @group
    @v_group.save

    render 'groups/update'
  end

  def update
    @v_group = VisionGroup.find(params[:id])
    @v_group.update_attributes(params[:vision_group])
  end

  def destroy
    v_group = VisionGroup.find(params[:id])

    @group = v_group.group
    v_group.destroy

    render 'groups/update'
  end

  def sort
    groups = current_user.vision_groups
    groups.each do |group|
      group.idx = params['order'][group.id.to_s]
      group.save
    end
    render :nothing => true
  end

  def icon
    @v_group = VisionGroup.find(params[:id])
  end

  def long_term
    @v_group = VisionGroup.find(params[:id])
  end

end

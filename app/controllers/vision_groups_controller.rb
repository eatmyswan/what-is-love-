class VisionGroupsController < ApplicationController
  
  
  def show
    @v_group = VisionGroup.find(params[:id])
    if params[:group_id]
      @group = Group.find params[:group_id]
    elsif params[:user_id]
      @group = User.find params[:user_id]
    end

    respond_to do |format|
        format.js { render :layout => false }
    end
  end

  def new
    @v_group = VisionGroup.new
    if params[:group_id]
      @group = Group.find params[:group_id]
    elsif params[:user_id]
      @group = User.find params[:user_id]
    end

    render :layout => false
  end

  def edit
    @v_group = VisionGroup.find(params[:id])
  end

  def create
    @v_group = VisionGroup.new(params[:vision_group])

    if params[:group_id]
      @group = Group.find params[:group_id]
    elsif params[:user_id]
      @group = @user = User.find(params[:user_id])
    end
    @v_group.idx = @group.vision_groups.count
    @v_group.dreamer = @group
    @v_group.save


    template = 'groups/update'
    template = 'users/update' if params[:user_id]
    respond_to do |format|
      format.js { render :template => template, :layout => false }
    end
  end

  def update
    @v_group = VisionGroup.find(params[:id])
    @v_group.update_attributes(params[:vision_group])
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def destroy
    group = VisionGroup.find(params[:id])
    group.destroy
    render :nothing => true
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

class VisionGroupsController < ApplicationController
  
  
  def show
    @group = VisionGroup.find(params[:id])
    respond_to do |format|
        format.js { render :layout => false }
    end
  end

  def new
    @group = VisionGroup.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @group }
    end
  end

  def edit
    @group = VisionGroup.find(params[:id])
  end

  def create
    @group = VisionGroup.new(params[:vision_group])
    @group.user_id = current_user.id
    @group.save

    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def update
    @group = VisionGroup.find(params[:id])
    @group.update_attributes(params[:vision_group])
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
    groups = VisionGroup.find(params[:vision_group])
    groups.each do |group|
      group.idx = params['group'].index(group.id.to_s) + 1
      group.save
    end
    render :nothing => true
  end
  
  def icon
    @group = VisionGroup.find(params[:id])
  end 
  
  def long_term
    @group = VisionGroup.find(params[:id])
  end

end

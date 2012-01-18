class GroupsController < ApplicationController
  
  
  def show
    @group = Group.find(params[:id])
    @is_outcome = params[:task_id] && Task.find(params[:task_id]).outcome == true

    respond_to do |format|
        format.js { render :layout => false }
    end
  end

  def new
    @group = Group.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @group }
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def create
    @group = Group.new(params[:group])
    @group.user_id = current_user.id
    @group.save
    if (params[:image])
      @image = Image.new(params[:image])
      if (params[:cover])
        @image.sort = 0
      end
      @group.images << @image
      @group.save 
    end
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def update
    @group = Group.find(params[:id])
    @group.update_attributes(params[:group])
    if (params[:image])
      @image = Image.new(params[:image])
      @group.images << @image
      @group.save 
    end
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def destroy
    group = Group.find(params[:id])
    group.destroy
    render :nothing => true
  end
  
  def sort
    groups = Group.find(params[:group])
    groups.each do |group|
      group.sort = params['group'].index(group.id.to_s) + 1
      group.save
    end
    render :nothing => true
  end
  
  def icon
    @group = Group.find(params[:id])
  end 
  
  def long_term
    @group = Group.find(params[:id])
  end

end
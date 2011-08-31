class GroupsController < ApplicationController
  
  def index
    @group = Group.where(user_id: current_user.id).first
    redirect_to(group_path(@group))
  end
  
  def show
    @group = Group.find(params[:id])
    @tasks = Task.where(group_id: params[:id]).and(block_id: nil).order_by([:sort, :asc],[:created_at, :desc])
  
    @blocks = Block.where(group_id: params[:id]).order_by([:sort, :asc],[:created_at, :desc])
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal').order_by([:created_at, :asc])
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional').order_by([:created_at, :asc])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @group }
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
    respond_to do |format|
      if @group.save
        format.html { redirect_to(group_path(@group.id)) }  
        format.js
      end
    end
  end

  def update
    @group = Group.find(params[:id])

    if @group.update_attributes(params[:group])
      if params[:group][:group]
        render :text => params[:group][:group]
      else
        redirect_to(group_path(params[:id]))
      end
    end
  end

  def destroy
    group = Group.find(params[:id])
    group.destroy
      redirect_to groups_path
  end
  
  def sort_groups
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

end
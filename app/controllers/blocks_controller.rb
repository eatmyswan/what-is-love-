class BlocksController < ApplicationController
  
  def index
    @blocks = Block.all.order_by([:sort, :asc])

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @block }
    end
  end
  
  def show
    @block = Block.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @block }
    end
  end

  def new
    @block = Block.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @block }
    end
  end

  def edit
    @block = Block.find(params[:id])
  end

  def create
    task = Task.find(params[:id])
    @block = Block.new
    @block.outcome = task.task
    @group = Group.find(task.group_id)
    @block.group = @group
    @block.purpose_group = @group.title
    task.destroy
    @block.user_id = current_user.id
    respond_to do |format|
      if @block.save
        format.html { redirect_to(group_path(@block.group)) }  
        format.js
      end
    end
  end

  def update
    @block = Block.find(params[:id])

    if @block.update_attributes(params[:block])
      if params[:block][:outcome]
        render :text => params[:block][:outcome]
      elsif params[:block][:purpose]
        render :text => params[:block][:purpose]
      else
        redirect_to(group_path(@block.group))
      end
    end
  end

  def destroy
    block = Block.find(params[:id])
    group = block.group
    block.destroy

    respond_to do |format|
      format.html { redirect_to(group_path(group)) }
      format.xml  { head :ok }
    end
  end
  
  def sort_blocks
    blocks = current_user.blocks
    blocks.each do |block|
      block.sort = params['block'].index(block.id.to_s) + 1
      block.save
    end
    render :nothing => true
  end

end
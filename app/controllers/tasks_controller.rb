class TasksController < ApplicationController
  
  def index
    @tasks = Task.where(block_id: nil).and(group_id: nil).order_by([:sort, :asc])
    @blocks = Block.where(group_id: nil).order_by([:sort, :asc])
    @groups = Group.all
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @task }
    end
  end
  
  def show
    @task = Task.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @task }
    end
  end

  def new
    @task = Task.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @task }
    end
  end

  def edit
    @task = Task.find(params[:id])
  end

  def create
    @task = Task.new(params[:task])
    @task.user_id = current_user.id
    respond_to do |format|
      if @task.save
        format.html { redirect_to( group_path(@task.group)) }  
        format.js
      end
    end
  end

  def update
    @task = Task.find(params[:id])

    respond_to do |format|
      if @task.update_attributes(params[:task])
        if params[:task][:task]
          format.html { render :text => params[:task][:task] }
        elsif params[:task][:complete] == "true"
          format.js
        else
          format.html { redirect_to(group_path(@task.group)) }
        end
      end
    end
  end

  def destroy
    task = Task.find(params[:id])
    group = task.group
    task.destroy

    respond_to do |format|
      format.html { redirect_to(group_path(group)) }
      format.xml  { head :ok }
    end
  end
  
  def sort_tasks
    tasks = Task.find(params[:task])
    tasks.each do |task|
      task.sort = params['task'].index(task.id.to_s) + 1
      task.save
    end
    render :nothing => true
  end
  
  def duration
    @task = Task.find(params[:id])
  end
  
  def leverage
    @task = Task.find(params[:id])
  end
  
  def to_rpm
    @task = Task.find(params[:id])
    logger.debug @task
    render :nothing => true
  end

end
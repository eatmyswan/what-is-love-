class TasksController < ApplicationController
  
  #before_filter :find_or_build_task, :except => [ :index, :create_bm ]
  
  def index
    @incomplete_tasks = Task.where(group_id: nil).and(user_id: current_user.id).and(complete: false).order_by([:sort, :asc])
    @complete_tasks = Task.where(group_id: nil).and(user_id: current_user.id).and(complete: true).order_by([:sort, :asc])
    respond_to do |format|
        format.js { render :layout => false }
    end
  end

  def new
    require 'time_diff'
    
    @task = Task.new
    @personal_groups = Group.where(user_id: current_user.id).and(personal: true)
    @professional_groups = Group.where(user_id: current_user.id).and(professional: true)
  end
  
  def new_from_cal
    @task = Task.new
    @task.group_id = params[:group_id]
  end

  def edit
    require 'time_diff'
    @task = Task.find(params[:id])
    @personal_groups = Group.where(user_id: current_user.id).and(personal: true)
    @professional_groups = Group.where(user_id: current_user.id).and(professional: true)
  end

  def create
    @task = Task.new(params[:task])
    @task.user_id = current_user.id
    @task.save
    if(params[:task][:end])
      render :json => @task
    else
       @group = @task.group
    end
  end

  def update
    @task = Task.find(params[:id])
    
    @open = params[:open]

    if params[:task]
      @task.update_attributes(params[:task])

      if params[:json]
        render :json => @task
      elsif params[:nothing] == 'true' || params[:task][:complete]
        render :nothing => true
      elsif params[:parent] == 'true'
        @task = Task.find(@task.parent_id)
        @open = 'true'
      end
      
      if params[:task][:group_id]
        @subtasks = Task.where(parent_id: @task.id.to_s)
        @subtasks.each do |task|
          task.group_id = params[:task][:group_id]
          task.save
        end
      end
      
    end
    
    if params[:reminders]
      params[:reminders].each do |r|
        reminder_dt = @task.start - r.to_i.minutes
        @task.reminders.create!( delivers_at: reminder_dt )
      end
      render :nothing => true
    end
    
    if params[:notes]
        @note = @task.notes.new( params[:notes] )
        @task.notes << @note
        render 'task_note', :layout => false
    end

    
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render :nothing => true
  end
  
  def sort
    tasks = Task.find(params[:task])
    if(params[:parent_id])
      tasks.each do |task|
        task.sort = params['task'].index(task.id.to_s)+1
        task.parent_id = params[:parent_id]
        task.group_id = params[:group_id]
        task.save
      end
      @task = Task.find(params[:parent_id])
      @open = 'true'
      render 'update'
    else
      tasks.each do |task|
        task.sort = params['task'].index(task.id.to_s)+1
        task.save
      end
      render :nothing => true
    end
  end
  
  def mylife_sort
    tasks = Task.find(params[:task])
    if(params[:parent_id])
      tasks.each do |task|
        task.sort = params['task'].index(task.id.to_s)+1
        task.parent_id = params[:parent_id]
        task.save
      end
      @task = Task.find(params[:parent_id])
      @open = 'true'
      render 'update'
    else
      tasks.each do |task|
        task.mylife_sort = params['task'].index(task.id.to_s) + 1
        task.save
      end
      render :nothing => true
    end
  end
  
  def capture_sort
    tasks = Task.find(params[:task])
    tasks.each do |task|
      task.capture_sort = params['task'].index(task.id.to_s) + 1
      task.save
    end
    render :nothing => true
  end
  
  def duration
    @task = Task.find(params[:id])
  end
  
  def to_rpm
    @task = Task.find(params[:id])
    render :nothing => true
  end
  
  def save_audio
    @task = Task.find(params[:id])
    @task.audio = params[:audio]
    @task.save!
    
    render :nothing => true
  end
  
  def edit_notes
    @task = Task.find(params[:id])
    respond_to do |format|
      format.html { render :layout => false }
    end
  end
  
  def edit_calendar
    @task = Task.find(params[:id])
    respond_to do |format|
      format.html { render :layout => false }
    end
  end
  
  def edit_group
    @inbox = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    @groups = Group.any_of({ personal: true }, { professional: true }).and(user_id: current_user.id)
    @task = Task.find(params[:id])
    respond_to do |format|
      format.html { render :layout => false }
    end
  end
  
  def schedule_task
    @task = Task.find(params[:id])
    @task.update_attributes(params[:task])
    respond_to do |format|
      format.js { render :layout => false }
    end
  end
  
  def load_outcome
     @task = Task.find(params[:id])
     render :layout => false
  end
  
  def debug
    @task = Task.find("4eef9b12e9f0824378000034")

    @task.destroy

    render :nothing => true
  end

end
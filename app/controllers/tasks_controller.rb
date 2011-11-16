class TasksController < ApplicationController
  
  #before_filter :find_or_build_task, :except => [ :index, :create_bm ]
  
  def index
    @incomplete_tasks = Task.where(group_id: nil).and(complete: false).order_by([:sort, :asc])
    @complete_tasks = Task.where(group_id: nil).and(complete: true).order_by([:sort, :asc])
    respond_to do |format|
        format.js { render :layout => false }
    end
  end

  def new
    require 'time_diff'
    
    @task = Task.new
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional')
  end
  
  def new_from_cal
    @task = Task.new
    @task.group_id = params[:group_id]
  end

  def edit
    require 'time_diff'
    @task = Task.find(params[:id])
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional')
  end

  def create
    @task = Task.new(params[:task])
    @task.user_id = current_user.id
    @task.save
    @group = @task.group
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(params[:task])
    
    if params[:task][:leverage]
      email = params[:task][:leverage]
      UserMailer.leverage_task(email).deliver
    end
    
    if params[:reminders]
      params[:reminders].each do |r|
        reminder_dt = @task.starts_at - r.to_i.minutes
        @task.reminders.create!( delivers_at: reminder_dt )
      end
    end
    
    if params[:notes]
      params[:notes].each do |note|
        @task.notes.create!( note: note )
      end
    end
    
    render :nothing => true
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render :nothing => true
  end
  
  def sort
    Rails.logger(params.inspect);
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
    render 'tasks/edit_notes'
  end


end
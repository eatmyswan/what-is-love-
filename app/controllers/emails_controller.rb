class EmailsController < ApplicationController
  
  def index
    
  end
  
  def show
    @email = Email.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @email }
    end
  end

  def new
    @email = Email.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @email }
    end
  end

  def edit
    @email = Email.find(params[:id])
  end

  def create
    @task = Task.find(params[:task_id]) 
    @email = Email.new(params[:email])
    @task.emails << @email
    respond_to do |format|
      if @task.save
        UserMailer.leverage_task(@email, @task, current_user).deliver 
        format.html { redirect_to(root_path) }  
        format.js
      end
    end
  end
  
  def create_from_flash
    require 'mp3info'
        
    @task = Task.find(params[:id]) 
    email = Email.new(params[:email])
    duration = Mp3Info.open(params[:email][:audio].path).length * 1000
    email.duration = duration.to_i
    email.duration_time = Email.duration_time(email.duration)
    
    @task.emails << email
    if @task.save
      render :text => "#{@task.id} #{email.id.to_s}"
    end
  end

  def update
    @task = Task.find(params[:task_id]) 
    @email = @task.emails.find(params[:id])
    respond_to do |format|
      if @email.update_attributes(params[:email])
        UserMailer.leverage_task(@email, @task, current_user).deliver 
        format.html { redirect_to(root_path) }
      end
    end
  end

  def destroy
    email = Email.find(params[:id])
    email.destroy

    respond_to do |format|
      format.html { redirect_to(root_path) }
      format.xml  { head :ok }
    end
  end
  
  def mini_player
    task = Task.find(params[:task_id])
    @email = task.emails.find(params[:email_id])
    render '/emails/_mini_player'
  end
  
  def email_form
    @task = Task.find(params[:id])
    render '/emails/_form'
  end
  
  def view_email
    @task = Task.find(params[:task_id])
    @email = @task.emails.find(params[:email_id])
    Rails.logger.debug @email.to_yaml
    @sender = User.find(@email.sender_uid)
    render :layout => 'view_email'
  end

end
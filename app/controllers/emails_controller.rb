class EmailsController < ApplicationController

  before_filter :authenticate_user!, :except => :view_email
  skip_before_filter :verify_authenticity_token

  def index

  end

  def show
    @email = Email.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @email }
    end
  end

  def edit
    @email = Email.find(params[:id])
  end

  def create
    @email = Email.new(params[:email])
    @email.user_id = current_user.id
    @email.save

    params[:task_id].each do |task_id|
      task = Task.find(task_id)
      @email.tasks << task if task.user_id == @email.user_id
    end

    if @email.outcome == true
      task = @email.tasks.first
      @task = Task.find(task.parent_id)
    else
      @task = @email.tasks.first
    end

    if @email.save
      UserMailer.leverage_task(@email, @task).deliver
      @email.user.notify('lev-send', @email, @task)
    end

    render :layout => false
  end

  def create_from_flash
    require 'mp3info'

    @email = Email.new(params[:email])
    @email.user_id = current_user.id
    duration = Mp3Info.open(params[:email][:audio].path).length * 1000
    @email.duration = duration.to_i
    @email.duration_time = Email.duration_time(@email.duration)

    if @email.save
      render :text => "#{@email.id.to_s}"
    end
  end

  def update
    @email = Email.find(params[:id])

    params[:task_id].each do |task_id|
      task = Task.find(task_id)
      @email.tasks << task
    end

    if @email.outcome == true
      task = @email.tasks.first
      @task = Task.find(task.parent_id)
    else
      @task = @email.tasks.first
    end

    if @email.update_attributes(params[:email])
      UserMailer.leverage_task(@email, @task).deliver
    end
    render :nothing => true

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
    @email = Email.find(params[:id])
    render '/emails/_mini_player', :layout => false
  end

  def email_form
    @email = Email.new()
    @task = Task.find(params[:id])
    render '/emails/_form', :layout => false
  end

  def view_email
    @email = Email.find(params[:id])
    if @email.outcome == true
      task = @email.tasks.first
      @task = Task.find(task.parent_id)
    else
      @task = @email.tasks.first
    end
    render '/emails/view_email', :layout => 'view_email'
  end

  def after_ajax_signin
    render :layout => false
  end

  def load_outcome
    @task = Task.find(params[:id])
  end

  def accept
    @email = Email.find(params[:email_id])
    @email.accepted = true
    @email.save

    sender = @email.user
    acceptor, original_task, accepted_task = nil

    group = Group.where(user_id: current_user.id).and(personal: false).and(professional: false).first
    if params[:outcome_id]
      outcome = Task.find(params[:outcome_id])
      outcome_new = outcome.dup
      outcome_new.user_id = current_user.id
      outcome_new.group_id = group.id
      outcome_new.sort = 0
      outcome_new.save

      params[:task_id].each do |task_id|
        task = Task.find(task_id)
        task_new = task.dup
        task_new.user_id = current_user.id
        task_new.group_id = group.id
        task_new.parent_id = outcome_new.id
        task_new.save

        task.luser_id = current_user.id
        task.save
      end

      UserMailer.accept_task(outcome.user.email, current_user.name, outcome).deliver
      acceptor = outcome_new.user
      original_task = outcome
      accepted_task = outcome_new
    else
      task = Task.find(params[:task_id][0])
      task_new = task.dup
      task_new.user_id = current_user.id
      task_new.group_id = group.id
      task_new.parent_id = task.parent_id
      task_new.sort = 0
      task_new.save

      task.luser_id = current_user.id
      task.save

      UserMailer.accept_task(task.user.email, current_user.name, task).deliver
      acceptor = task_new.user
      original_task = task
      accepted_task = task_new
    end

    if [sender, acceptor, original_task, accepted_task].all?

      acceptor.notify('lev-accept', acceptor, accepted_task)
      sender.notify('lev-accept', acceptor, original_task) if sender != acceptor

      # Remove sendor's previous lev-send notice
      old_notice = Notice.get('lev-send', @email, original_task)
      d = old_notice.delete unless old_notice.nil?
    end

  end

  def reject
    @email = Email.find(params[:email_id])
    @email.accepted = false
    @email.save
    UserMailer.reject_task(@email.user.email).deliver
    @email.user.notify('lev-reject', current_user, @email.tasks.first)
  end


end
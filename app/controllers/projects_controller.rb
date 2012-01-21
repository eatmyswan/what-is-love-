class ProjectsController < ApplicationController

  def index
    @project = Project.where(user_id: current_user.id).first()
    @projects = Project.where(user_id: current_user.id)
  end
  
  def show
    @project = Project.find(params[:id])
    @projects = Project.where(user_id: current_user.id)
  end
  
  def update
    @project = Project.find(params[:id])
    @project.update_attributes(params[:project])
    respond_to do |format|
      format.js { render :layout => false }
    end
  end
  
  def destroy
    project = Project.find(params[:id])
    task = Task.where(task_to_project_id: params[:id])
    task.destroy
    project.destroy
    render :nothing => true
  end

end

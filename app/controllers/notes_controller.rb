class NotesController < ApplicationController
  
  def create
    @project = Project.find(params[:project_id])
    @note = @project.notes.new( params[:note] )
    @project.notes << @note

    render :nothing => true
  end

  def destroy
    if params[:task_id]
      task = Task.find(params[:task_id])
      task.notes.find(params[:id]).destroy
    elsif params[:project_id]
      project = Project.find(params[:project_id])
      project.notes.find(params[:id]).destroy
    end
    
    render :nothing => true
  end


end
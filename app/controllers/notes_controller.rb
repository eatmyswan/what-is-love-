class NotesController < ApplicationController
  

  def destroy
    task = Task.find(params[:task_id])
    task.notes.find(params[:id]).destroy

    render :nothing => true
  end


end
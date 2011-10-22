class RemindersController < ApplicationController
  

  def destroy
    task = Task.find(params[:task_id])
    task.reminders.find(params[:id]).destroy

    render :nothing => true
  end


end
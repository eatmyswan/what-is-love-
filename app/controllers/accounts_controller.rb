class AccountsController < ApplicationController
  
  def settings
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @task }
    end
  end
  
  def background
    @user = User.find(current_user.id)
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @task }
    end
  end


end
class AccountsController < ApplicationController
  before_filter :authenticate_user!
  
  def settings
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @task }
    end
  end


end
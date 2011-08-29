class AccountsController < ApplicationController
  
  def settings
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @task }
    end
  end


end
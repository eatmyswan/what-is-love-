class InvitesController < ApplicationController
  layout false

  def index
  end

  def new
    @invite = Invite.new
  end
  
  def create 
    @invite = Invite.new(params[:invite])
    if @invite.save
      render 'create'
    else
      render 'new'
    end
  end

end
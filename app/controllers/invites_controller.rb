class InvitesController < ApplicationController

  def index
    
  end
  
  def create 
    @invite = Invite.new(params[:invite])
    @invite.save
    render :layout => 'invite'
  end

end
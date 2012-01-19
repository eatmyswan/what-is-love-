class InvitesController < ApplicationController
  layout false

  def index
  end

  def new
    @invite = Invite.new :type => :desktop
  end

  def create
    @invite = Invite.new(params[:invite])

    if @invite.type == 'desktop' && User.find_by_email(@invite.email)
      @already_has_account = true
      render 'new'
    elsif @invite.save
      UserMailer.confirm_beta_request(@invite).deliver
      render 'create'
    else
      render 'new'
    end
  end

end
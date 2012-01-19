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
      UserMailer.confirm_beta_request(@invite.email).deliver
      render 'create'
    else
      if @invite.errors[:email] && @invite.errors[:email].include?('taken')
        error_idx = @invite.errors[:email].index 'taken'
        @invite.errors[:email].delete_at error_idx
        @invite.errors[:you] = 'have already requested a beta invite'
      end
      render 'new'
    end
  end

end
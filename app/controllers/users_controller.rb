class UsersController < ApplicationController

  before_filter :authenticate_user!

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(params[:user])
    if (params[:image])
        @image = Image.new(params[:image])
        @user.images << @image
        @user.save
    end
    respond_to do |format|
      format.js { render :layout => false }
    end
  end

end
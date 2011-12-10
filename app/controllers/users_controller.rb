class UsersController < ApplicationController
  
  before_filter :authenticate_user!
  
  def index
    @user = User.find(current_user.id)
    @personal_groups = Group.where(user_id: current_user.id).and(personal: true)
    @professional_groups = Group.where(user_id: current_user.id).and(professional: true)
  end
  
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
class UsersController < ApplicationController
  
  def index
    @user = User.find(current_user.id)
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional')
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
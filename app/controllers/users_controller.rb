class UsersController < ApplicationController
  
  def index
    @user = User.find(current_user.id)
    @personal_groups = Group.where(user_id: current_user.id).and(master_title: 'Personal')
    @professional_groups = Group.where(user_id: current_user.id).and(master_title: 'Professional')
  end
  
  def update
    @user = User.find(params[:id])

    if @user.update_attributes(params[:user])
      redirect_to( '/users' )
    end
  end
  
end
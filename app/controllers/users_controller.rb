class UsersController < ApplicationController
  
  def update
    @user = User.find(params[:id])

    if @user.update_attributes(params[:user])
      redirect_to( root_path )
    end
  end
  
end
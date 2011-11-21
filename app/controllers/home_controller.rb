class HomeController < ApplicationController

  def index

      @inbox = Group.where(user_id: current_user.id).and(master_title: nil).first
      @personal = Group.where(user_id: current_user.id).and(master_title: 'Personal')
      @professional = Group.where(user_id: current_user.id).and(master_title: 'Professional')
   
  end

end
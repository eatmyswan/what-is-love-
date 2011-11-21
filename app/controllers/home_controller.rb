class HomeController < ApplicationController

  def index

      @inbox = Group.all
      @personal = Group.all
      @professional = Group.all
    end
  end

end
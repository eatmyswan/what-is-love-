class ProjectsController < ApplicationController

  def index
    @project = Project.first()
    @projects = Project.all()
  end

end

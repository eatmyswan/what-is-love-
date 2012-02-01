class ImagesController < ApplicationController
  before_filter :find_or_build_image, :except => :index

  def create
    @image.save
    respond_to do |format|
      format.js { render @template, :layout => false }
    end
  end

  def update
    @image.update_attributes(params[:image])
    if(params[:user_id])
      render :nothing => true
    elsif(params[:group_id])
      respond_to do |format|
        format.js { render :layout => false }
      end
    end
  end

  def destroy
    @image.destroy
    respond_to do |format|
      format.js { render @template, :layout => false }
    end
  end

private
  
  def find_or_build_image
    if(params[:user_id])
      @user = @group = User.find(params[:user_id])
      @image = params[:id] ?  @group.images.find(params[:id]) :  @group.images.new(params[:image])
      @template = 'users/update'
    elsif(params[:group_id])
      @group = Group.find(params[:group_id])
      @image = params[:id] ?  @group.images.find(params[:id]) :  @group.images.new(params[:image])
      @template = 'groups/update'
    end
  end
  
end
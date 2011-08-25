class SubgroupsController < ApplicationController
  before_filter :authenticate_user!
  
  def index

    @subsubgroups = Subgroup.all
    
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @subgroup }
    end
  end
  
  def show
    @subgroup = Subgroup.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @subgroup }
    end
  end

  def new
    @subgroup = Subgroup.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @subgroup }
    end
  end

  def edit
    @subgroup = Subgroup.find(params[:id])
  end

  def create
    @subgroup = Subgroup.new(params[:subgroup])
    @subgroup.user_id = current_user.id
    respond_to do |format|
      if @subgroup.save
        format.html { redirect_to(root_path) }  
        format.js
      end
    end
  end

  def update
    @subgroup = Subgroup.find(params[:id])

    if @subgroup.update_attributes(params[:subgroup])
      if params[:subgroup][:subgroup]
        render :text => params[:subgroup][:subgroup]
      else
        redirect_to(root_path)
      end
    end
  end

  def destroy
    subgroup = Subgroup.find(params[:id])
    subgroup.destroy

    respond_to do |format|
      format.html { redirect_to(root_url) }
      format.xml  { head :ok }
    end
  end
  
  def sort_subsubgroups
    subsubgroups = Subgroup.find(params[:subgroup])
     logger.debug subsubgroups.inspect
    subsubgroups.each do |subgroup|
      subgroup.sort = params['subgroup'].index(subgroup.id.to_s) + 1
      subgroup.save
    end
    render :nothing => true
  end
  

end
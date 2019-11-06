class GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    group.create(group_params)
    redirect_to root_path
  end

  def edit

  end

  def update
    group.update(group_params)
    redirect_to root_path
  end

  private
    def group_params
      params.require(:group).permit(:name)
    end
end

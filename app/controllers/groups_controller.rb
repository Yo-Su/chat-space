class GroupsController < ApplicationController
  def index

  end

  def new
    # binding.pry
    @group = Group.new
    @group.users << current_user
    @users = User.all
    # binding.pry
  end

  def create
    @group = Group.new(group_params)
    @users = User.all
    # binding.pry
    if @group.save
      redirect_to root_path
      flash[:notice] = "グループを作成しました"
    else
      render :new
    end
  end

  # def edit
  #   @group = Group.new
  #   @users = User.all
  # end

  # def update
  #   Group.update(group_params)
  #   redirect_to root_path
  # end

  private
    def group_params
      params.require(:group).permit(:name, user_names: [] )
    end
end

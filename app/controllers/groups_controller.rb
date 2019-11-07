class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

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

  def edit
    @users = User.all
  end

  def update
    @users = User.all
    if @group.update(group_params)
      redirect_to root_path
      flash[:notice] = "グループを編集しました"
    else
      render :edit
    end
  end

  private
    def group_params
      params.require(:group).permit(:name, user_names: [] )
    end

    def set_group
      @group = Group.find(params[:id])
    end
end

class UsersController < ApplicationController
  def index
    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    # binding.pry
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      # flash[:notice]
      redirect_to root_path
    else
      # flash[:alert] = '失敗しました'
      render :edit
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email)
    end
end

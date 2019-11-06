class UsersController < ApplicationController
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

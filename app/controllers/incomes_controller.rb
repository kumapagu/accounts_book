class IncomesController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
  

  private

  def income_params
    params.require(:income).permit(:date, :amount, :income_item_id, :memo).merge(user_id: current_user.id)
  end

end

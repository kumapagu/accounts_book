class ExpensesController < ApplicationController
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

  def expense_params
    params.require(:expense).permit(:date, :amount, :expenditure_item_id, :memo).merge(user_id: current_user.id)
  end
end
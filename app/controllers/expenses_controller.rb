class ExpensesController < ApplicationController
  def show
  end

  def new
    @expense = Expense.new
  end

  def create
    @expense = Expense.new(expense_params)
    if @expense.save
      redirect_to root_path
    else
      render :index
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def expense_params
    params.permit(:date, :amount, :expenditure_item_id, :memo).merge(user_id: current_user.id)
  end
end
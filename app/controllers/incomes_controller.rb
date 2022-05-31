class IncomesController < ApplicationController
  def index
    # @incomes = Income.find_by_sql("SELECT date, SUM(amount) AS total_amount FROM Incomes GROUP BY date")
    res = ActiveRecord::Base.connection.select_all("SELECT date, SUM(amount) AS total_amount FROM Incomes GROUP BY date")
    @incomes = res.to_a
    gon.incomes = @incomes

    ex_res = ActiveRecord::Base.connection.select_all("SELECT date, SUM(amount) AS total_amount FROM Expenses GROUP BY date")
    gon.expenses = ex_res.to_a

    # date = params[:date]
    # @day_income = ActiveRecord::Base.connection.select_all("SELECT amount, income_item_id, memo FROM Incomes WHERE date = '#{date}'")
    # gon.dayIncome = @day_income.to_a
  end

  def show
  end

  def new
    @income = Income.new
  end

  def create
    @income = Income.new(income_params)
    # binding.pry
    if @income.save
      redirect_to root_path
    else
      render :index
    end
  end

  def edit
    binding.pry
    @income = Income.find(params[:id])
  end

  def update
    @income = Income.find(params[:id])
    if @income.update(edit_income_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
  end

  def card
    date = params[:date]
    day_income = ActiveRecord::Base.connection.select_all("SELECT id, amount, income_item_id, memo FROM Incomes WHERE date = '#{date}'").to_a
    day_expense = ActiveRecord::Base.connection.select_all("SELECT id, amount, expenditure_item_id, memo FROM Expenses WHERE date = '#{date}'").to_a
    day_expense.each do |expense|
      day_income.push(expense)
    end

    render json: day_income
  end

  private

  def income_params
    params.permit(:date, :amount, :income_item_id, :memo).merge(user_id: current_user.id)
  end

  def edit_income_params
    params.require(:income).permit(:date, :amount, :income_item_id, :memo).merge(user_id: current_user.id)
  end

end

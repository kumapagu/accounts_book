class IncomesController < ApplicationController
  def index
    # @incomes = Income.find_by_sql("SELECT date, SUM(amount) AS total_amount FROM Incomes GROUP BY date")
    res = ActiveRecord::Base.connection.select_all("SELECT date, SUM(amount) AS total_amount FROM Incomes GROUP BY date")
    @incomes = res.to_a
    gon.incomes = @incomes
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
  end

  def update
  end

  def destroy
  end
  

  private

  def income_params
    params.permit(:date, :amount, :income_item_id, :memo).merge(user_id: current_user.id)
  end

end

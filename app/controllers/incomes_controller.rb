class IncomesController < ApplicationController
  def index
  end

  def show
  end

  def new
    @income = Income.new
  end

  def create
    @income = Income.new(income_params)
    if @income.save
      redirect_to root_path
    else
      render :new
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

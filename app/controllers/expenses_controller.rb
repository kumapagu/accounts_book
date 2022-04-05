class ExpensesController < ApplicationController

  
  def index
      # @incomes=Income.where("date = ?",)where(['date LIKE ?',  "%#{search}%"])
    # クエリストリングがあればTimeオブジェクトに変換、ない場合は現在の時刻を取得
    @month = params[:month] ? Date.parse(params[:month]) : Time.zone.today
    # 取得した時刻が含まれる月の範囲のデータを取得
    @incomes = Income.where(date: @month.all_month)
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
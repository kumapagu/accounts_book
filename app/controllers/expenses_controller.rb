class ExpensesController < ApplicationController

  
  def index
    # クエリストリングがあればTimeオブジェクトに変換、ない場合は現在の時刻を取得
    @month = params[:month] ? Date.parse(params[:month]) : Time.zone.today
    #収入 
    @incomes = Income.where(date: @month.all_month) #取得した時刻が含まれる月の範囲のデータを取得
    fulfilling = @incomes.pluck(:income_item_id,:amount) #pluckで配列として取り出し
    @incomesmonthly = incomesmonthly(fulfilling)
    #支出 
    @expenses = Expense.where(date: @month.all_month) #取得した時刻が含まれる月の範囲のデータを取得
    fulfilling = @expenses.pluck(:expenditure_item_id,:amount) #pluckで配列として取り出し
    @expensesmonthly = expensesmonthly(fulfilling)

  end
  
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

  def incomesmonthly(array)
    result = [["給料",0],["臨時収入",0],["その他",0]]
    array.each do |i,a|
      if i == 2
        result[0][1] += a
      elsif i == 3
        result[1][1] += a
      else 
        result[2][1] += a
      end
    end
    return result
  end

  def expensesmonthly(array)
    result = [["食費",0],["日用品",0],["交通費",0],["趣味娯楽",0],["衣服",0],["美容",0],["交際費",0],["教養",0],["通信",0],["住宅",0],["水光熱費",0],["医療",0],["保険",0],["投資",0],["その他",0]]
    array.each do |i,a|
      if i == 2
        result[0][1] += a
      elsif i == 3
        result[1][1] += a
      elsif i == 4
        result[2][1] += a
      elsif i == 5
        result[3][1] += a
      elsif i == 6
        result[4][1] += a
      elsif i == 7
        result[5][1] += a
      elsif i == 8
        result[6][1] += a
      elsif i == 9
        result[7][1] += a
      elsif i == 10
        result[8][1] += a
      elsif i == 11
        result[9][1] += a
      elsif i == 12
        result[10][1] += a
      elsif i == 13
        result[11][1] += a
      elsif i == 14
        result[12][1] += a
      elsif i == 15
        result[13][1] += a
      else 
        result[15][1] += a
      end
    end
    return result
  end

  private

  def expense_params
    params.permit(:date, :amount, :expenditure_item_id, :memo).merge(user_id: current_user.id)
  end

end
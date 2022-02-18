class CreateIncomes < ActiveRecord::Migration[6.0]
  def change
    create_table :incomes do |t|
      t.date :date, null: false
      t.integer :amount, null: false
      t.integer :income_item_id, null: false
      t.text :memo
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end

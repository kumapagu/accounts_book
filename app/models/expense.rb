class Expense < ApplicationRecord
  validates :date, presence: true
  validates :amount, presence: true
  validates :expenditure_item_id, numericality: { other_than: 1, message: "can't be blank" }

  belongs_to :user

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :expenditure_item
end
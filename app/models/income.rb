class Income < ApplicationRecord
  validates :date, presence: true
  validates :amount, presence: true
  validates :income_item_id, numericality: { other_than: 1, message: "can't be blank" }

  belongs_to :user

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :income_item
end

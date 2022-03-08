class IncomeItem < ActiveHash::Base
  self.data = [
    { id: 1, name: '---' },
    { id: 2, name: '給料' },
    { id: 3, name: '臨時収入' },
    { id: 4, name: 'その他' }
  ]

  include ActiveHash::Associations
  has_many :incomes
end
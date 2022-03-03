class ExpenditureItem < ActiveHash::Base
  self.data = [
    { id: 1, name: '---' },
    { id: 2, name: '食費' },
    { id: 3, name: '日用品' },
    { id: 4, name: '交通費' },
    { id: 5, name: '趣味娯楽' },
    { id: 6, name: '衣服' },
    { id: 7, name: '美容' },
    { id: 8, name: '交際費' },
    { id: 9, name: '教養' },
    { id: 10, name: '通信' },
    { id: 11, name: '住宅' },
    { id: 12, name: '水光熱費' },
    { id: 13, name: '医療' },
    { id: 14, name: '保険' },
    { id: 15, name: '投資' },
    { id: 16, name: 'その他' }
  ]

  include ActiveHash::Asociations
  has_many :expenses
end
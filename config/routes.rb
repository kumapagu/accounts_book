Rails.application.routes.draw do
  get 'incomes/index'
  devise_for :users

end

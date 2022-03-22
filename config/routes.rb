Rails.application.routes.draw do
  root to: 'incomes#index'
  resources :incomes, :expenses

  devise_for :users
end

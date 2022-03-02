Rails.application.routes.draw do
  root to: 'incomes#index'
  resources :incomes, :expenses, except: [:index]

  devise_for :users
end

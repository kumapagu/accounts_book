Rails.application.routes.draw do
  root to: 'incomes#index'
  resources :incomes, :expenses, except: [:index] do

    collection do
      get 'card'
    end
  end

  devise_for :users
end

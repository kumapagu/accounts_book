Rails.application.routes.draw do
  root to: 'incomes#index'

  resources :incomes, :expenses do

    collection do
      get 'card'
    end
  end

  devise_for :users
end

Rails.application.routes.draw do
  resources :user_sessions
  resources :users

  get  'login'  => 'user_sessions#new',     as: :login
  post 'logout' => 'user_sessions#destroy', as: :logout
  root 'users#index'
end

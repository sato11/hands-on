Rails.application.routes.draw do
  resources :user_sessions
  resources :users

  get  'login'  => 'user_sessions#new',     as: :login
  post 'logout' => 'user_sessions#destroy', as: :logout

  post 'oauth/callback'  => 'oauths#callback'
  get  'oauth/callback'  => 'oauths#callback' # for Github and Facebook
  get  'oauth/:provider' => 'oauths#oauth', as: :auth_at_provider

  root 'users#index'
end

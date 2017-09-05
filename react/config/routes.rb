Rails.application.routes.draw do
  resource :discover, only: %i(show)
  root 'home#index'
end

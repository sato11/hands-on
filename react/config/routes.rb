Rails.application.routes.draw do
  resources :components, only: %i(index)
  root 'home#index'
end

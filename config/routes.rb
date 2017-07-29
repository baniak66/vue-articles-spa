Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'app', to: 'articles#app', as: 'app'
  root "articles#app"
  resources :articles do
    resources :comments, only: [:create, :destroy]
  end
  get '/auth/:provider/callback', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end

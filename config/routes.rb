Rails.application.routes.draw do

  devise_for :users
  root to: 'static_pages#root'
  resources :tags, defaults: {format: :json}
  resources :lists, defaults: {format: :json} do
    resources :tasks, defaults: {format: :json}
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

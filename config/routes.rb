Rpm::Application.routes.draw do

  devise_for :users

  root :to => "home#index"

  resources :tasks do
    resources :notes, :only => :destroy
    resources :reminders, :only => :destroy
  end

  resources :emails

  resources :users do
    resources :images
    resources :goals
    resources :vision_groups
  end

  resources :groups do
    resources :images
    resources :goals
    resources :vision_groups
  end

  resources :vision_groups do
    resources :vision_goals
  end

  resources :invites, :only => [:new, :create]
  

  match 'tasks/sort' => 'tasks#sort'
  match 'tasks/capture_sort' => 'tasks#capture_sort'
  match 'tasks/mylife_sort' => 'tasks#mylife_sort'

  match 'tasks/sort' => 'tasks#sort'
  match 'task/update/:id' => 'tasks#update'

  match 'groups/sort' => 'groups#sort'
  match 'groups/long_term/:id' => 'groups#long_term', :as => :group_long_term

  post 'sort' => 'vision_groups#sort', :as => :vision_groups_sort


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.


  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end

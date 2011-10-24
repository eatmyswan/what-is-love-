Rpm::Application.routes.draw do
  match 'rubyamf/gateway', :to => 'rubyamf#gateway'

  
  root :to => "home#index"
  
  resources :tasks do 
    resources :subtasks do
        resources :emails
        resources :notes, :only => :destroy
        resources :reminders, :only => :destroy
    end
    resources :emails
    resources :notes, :only => :destroy
    resources :reminders, :only => :destroy
  end
  
  resources :audios
  resources :blocks
  resources :users do
    resources :goals
  end
  
  resources :groups do
    resources :subgroups
  end
  
  match 'forecast/index' => 'forecast#index'
  match 'week' => 'weeks#index'
  match 'week/new' => 'weeks#new'
  match 'week/day' => 'weeks#day'
  match 'masterplan' => 'home#masterplan'
  
  match 'tasks/sort_tasks' => 'tasks#sort_tasks'
  match 'task/new_from_cal/:group_id' => 'tasks#new_from_cal'
  match 'task/duration/:id' => 'tasks#duration'
  match 'task/update/:id' => 'tasks#update'
  match 'block/create/:id' => 'blocks#create', :as => :block_create
  match 'blocks/sort_blocks' => 'blocks#sort_blocks'
  match 'block/update/:id' => 'blocks#update'
  match 'account/settings' => 'accounts#settings', :as => :account_settings
  match 'account/background' => 'accounts#background', :as => :account_background
  match '/auth/:provider/callback' => 'sessions#create'
  match '/signout' => 'sessions#destroy', :as => :signout
  match 'group/icon/:id' => 'groups#icon'
  match 'groups/sort_groups' => 'groups#sort_groups'
  match 'task/save_audio/:id' => 'tasks#save_audio'
  match 'task/:task_id/email/:email_id/mini_player' => 'emails#mini_player'
  match 'email/update/:id' => 'emails#update'
  match 'emails/create_from_flash/:id' => 'emails#create_from_flash'
  match 'email/email_form/:id' => 'emails#email_form'
  match 'task/:task_id/email/:email_id/view_email' => 'emails#view_email'
  match 'task/edit_notes/:id' => 'tasks#edit_notes'
  
  
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

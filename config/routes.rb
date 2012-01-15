Rpm::Application.routes.draw do

  devise_for :users

  root :to => "home#index"
  
  resources :tasks do
    resources :notes, :only => :destroy
    resources :reminders, :only => :destroy
  end
  
  resources :emails
  
  resources :audios
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
  
  resources :invites, :only => :create
  
  match 'tasks/sort' => 'tasks#sort'
  match 'tasks/capture_sort' => 'tasks#capture_sort'
  match 'tasks/mylife_sort' => 'tasks#mylife_sort'
  match 'task/debug' => 'tasks#debug'
  
  match 'month/index/:start_date' => 'month#index', :as => :month
  match 'month/json/:start_date/:end_date' => 'month#json', :as => :month_json

  match 'week/capture/:start_date' => 'week#capture', :as => :week_capture
  match 'week/plan/:start_date' => 'week#plan', :as => :week_plan
  match 'week/forecast/:start_date' => 'week#forecast', :as => :week_forecast
  match 'week/side/:start_date' => 'week#side'
  match 'week/load_plan/:start_date' => 'week#load_plan'
  match 'week/json/:start_date/:end_date' => 'week#json', :as => :week_json
  match 'week/outcome/:id' => 'week#outcome'
  match 'week/group/:id' => 'week#group'
  
  match 'day/capture/:start_date' => 'day#capture', :as => :day_capture
  match 'day/plan/:start_date' => 'day#plan', :as => :day_plan
  match 'day/schedule/:start_date' => 'day#schedule', :as => :day_schedule
  match 'day/side/:start_date' => 'day#side'
  match 'day/load_plan/:start_date' => 'day#load_plan'
  
  match 'tasks/sort' => 'tasks#sort'
  match 'task/update/:id' => 'tasks#update'

  match 'group/icon/:id' => 'groups#icon'
  match 'groups/sort' => 'groups#sort'
  match 'groups/long_term/:id' => 'groups#long_term', :as => :group_long_term
  match 'task/save_audio/:id' => 'tasks#save_audio'
  match 'email/:id/mini_player' => 'emails#mini_player'
  match 'email/update/:id' => 'emails#update'
  match 'emails/create_from_flash/:id' => 'emails#create_from_flash'
  match 'email/email_form/:id' => 'emails#email_form'
  match 'email/load_outcome/:id' => 'emails#load_outcome'
  
  match 'email/accept/:email_id' => 'emails#accept', :as => :accept_email
  match 'email/reject/:email_id' => 'emails#reject', :as => :reject_email
  
  match 'email/:id/view_email' => 'emails#view_email', :as => :view_email
  match 'task/edit_notes/:id' => 'tasks#edit_notes'
  match 'task/edit_calendar/:id' => 'tasks#edit_calendar'
  match 'task/edit_group/:id' => 'tasks#edit_group'
  match 'task/schedule_task/:id' => 'tasks#schedule_task'

  match 'task/load_outcome/:id' => 'tasks#load_outcome'


  get "notices/latest" => "notices#latest"
  get "notices/latest/details" => "notices#latest_panel", :as => :notice_panel
  
  
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

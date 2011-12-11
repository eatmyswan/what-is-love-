class Image 
  include Mongoid::Document
  include Mongoid::Timestamps
  field :sort, type: Integer, default: 0
  
  mount_uploader :image, ImageUploader
  
  embedded_in :user
  embedded_in :group
  
  
  validates_presence_of :image
  
  scope :forward, order_by([[:sort, :asc],[:created_at, :desc]])

end

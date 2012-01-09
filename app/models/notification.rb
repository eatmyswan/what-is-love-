class Notification 
  include Mongoid::Document
  include Mongoid::Timestamps
  field :message, type: Integer, default: 0
  
  mount_uploader :image, ImageUploader
  
  belongs_to :task


end

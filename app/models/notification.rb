class Image 
  include Mongoid::Document
  include Mongoid::Timestamps
  field :sort, type: Integer, default: 0
  
  mount_uploader :image, ImageUploader
  
  belongs_to :task


end

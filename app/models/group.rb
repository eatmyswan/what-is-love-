class Group
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :personal, type: Boolean, default: false
  field :professional, type: Boolean, default: false
  field :sort, type: Integer, default: 0
  field :icon, type: String, default: "icon_check"
  field :vision, type: String, default: nil
  field :purpose, type: String, default: nil

  belongs_to :user
  has_many :tasks
  has_many :vision_groups, :as => :dreamer
  embeds_many :goals
  embeds_many :images

  index :user_id
  index :personal
  index :professional
  
  scope :forward, order_by(:sort.asc)
  
  validates_length_of :title, minimum: 1, message: "Group name cannot be blank."

  def top_image_src
    self.images.forward.first.image.thumb
  end
end
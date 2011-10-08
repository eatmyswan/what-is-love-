class Group
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :master_title, type: String
  field :sort, type: Integer, default: 0
  field :icon, type: String, default: "icon_check"

  belongs_to :user
  has_many :tasks
  has_many :blocks

  index :user_id
  
  scope :forward, order_by(:sort.asc)
  
  validates_length_of :title, minimum: 1, message: "Group name cannot be blank."

end

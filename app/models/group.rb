class Group
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :type,  type: String, default: 'cat'

  field :sort, type: Integer, default: 0
  field :icon, type: String, default: "archive"
  field :vision, type: String, default: nil
  field :purpose, type: String, default: nil

  belongs_to :user
  has_many :tasks
  has_many :vision_groups
  embeds_many :goals
  embeds_many :images

  index :user_id
  index :type

  scope :forward, order_by(:sort.asc)

  validates_length_of :title, minimum: 1, message: "Group name cannot be blank."

end

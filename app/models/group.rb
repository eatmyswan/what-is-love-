class Group
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :sort, type: Integer, default: 0

  belongs_to :user
  has_many :tasks
  has_many :blocks
  embeds_many :subgroups
  
  index :user_id
  
  validates_length_of :title, minimum: 1, message: "Group name cannot be blank."

end

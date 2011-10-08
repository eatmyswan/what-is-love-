class Block
  include Mongoid::Document
  include Mongoid::Timestamps
  field :outcome, type: String
  field :purpose, type: String
  field :purpose_group, type: String
  field :complete, type: Boolean, default: false
  field :sort, type: Integer, default: 0
  field :collapsed, type: Boolean, default: true

  belongs_to :user
  belongs_to :group
  has_many :tasks
  
  index :user_id
  index :group_id
  
  validates_length_of :outcome, minimum: 1, message: "outcome cannot be blank."
  
end
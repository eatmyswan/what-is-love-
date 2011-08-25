class Block
  include Mongoid::Document
  include Mongoid::Timestamps
  field :outcome, type: String
  field :purpose, type: String
  field :complete, type: Boolean, default: false
  field :sort, type: Integer, default: 0

  belongs_to :user
  belongs_to :group
  has_many :tasks

end

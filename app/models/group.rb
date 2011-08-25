class Group
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :sort, type: Integer, default: 0

  belongs_to :user
  has_many :tasks
  has_many :blocks
  embeds_many :subgroups

end

class Subgroup
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :sort, type: Integer, default: 0

  embedded_in :group

end

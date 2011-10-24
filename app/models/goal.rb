class Goal
  include Mongoid::Document
  include Mongoid::Timestamps
  field :text, type: String
  field :range, type: Integer, default: 30

  embedded_in :group

  index :user_id
  
  validates_length_of :text, minimum: 1, message: "Group name cannot be blank."

end

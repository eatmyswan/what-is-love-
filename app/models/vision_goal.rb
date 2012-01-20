class VisionGoal
  include Mongoid::Document
  include Mongoid::Timestamps
  embedded_in :vision_goal

  field :text, type: String
  field :idx, type: Integer

  validates_length_of :text, minimum: 1, message: "Goal name cannot be blank."

end

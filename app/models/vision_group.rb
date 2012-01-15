class VisionGroup
  include Mongoid::Document
  include Mongoid::Timestamps
  belongs_to :dreamer, :polymorphic => true
  embeds_many :vision_goals

  field :title, type: String
  field :idx, type: Integer

  def create_goal(text)
    self.vision_goals.create :text => text, :idx => self.vision_goals.count
  end
  
  validates_length_of :title, minimum: 1, message: "Vision name cannot be blank."

end

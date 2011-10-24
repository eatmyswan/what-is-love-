class Reminder
  include Mongoid::Document
  include Mongoid::Timestamps
  field :delivers_at, type: DateTime

  belongs_to :task
  belongs_to :subtask
  
end
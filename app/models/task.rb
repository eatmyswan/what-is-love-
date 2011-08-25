class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :task, type: String
  field :must, type: Boolean, default: false
  field :complete, type: Boolean, default: false
  field :sort, type: Integer, default: 0
  field :duration, type: Integer, default: nil
  field :scheduled, type: Date, default: nil
  field :leverage, type: String, default: nil

  belongs_to :user
  belongs_to :block
  belongs_to :group
  
  before_save :nil_if_blank
  
  protected
  def nil_if_blank
    self.leverage.blank? ? self.leverage = nil : return
    self.duration.blank? ? self.duration = nil : return
    self.scheduled.blank? ? self.scheduled = nil : return
  end

  
end

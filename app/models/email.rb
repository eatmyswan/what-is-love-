class Email 
  include Mongoid::Document
  include Mongoid::Timestamps
  field :to_email, type: String
  field :message, type: String
  field :outcome, type: Boolean, default: false
  field :accepted, type: Boolean
  field :duration, type: Integer
  field :duration_time, type: String
  
  mount_uploader :audio, AudioUploader

  has_many :tasks
  belongs_to :user
  
  def self.duration_time(duration)
    Time.at(duration/1000).gmtime.strftime('%-M.%S')
  end

end
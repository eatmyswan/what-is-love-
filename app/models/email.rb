require 'carrierwave/orm/mongoid'

class Email 
  include Mongoid::Document
  include Mongoid::Timestamps
  field :recipient, type: String
  field :sender, type: String
  field :subject, type: String
  field :body_html, type: String
  field :body_text, type: String
  field :duration, type: Integer
  field :duration_time, type: String
  
  mount_uploader :audio, AudioUploader

  embedded_in :task, :inverse_of => :emails
  
  def self.duration_time(duration)
    Time.at(duration/1000).gmtime.strftime('%-M.%S')
  end

end
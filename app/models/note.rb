class Note 
  include Mongoid::Document
  include Mongoid::Timestamps
  field :note, type: String

  embedded_in :task, :inverse_of => :notes

end
class Invite
  include Mongoid::Document
  
  field :name, type: String
  field :email, type: String

end

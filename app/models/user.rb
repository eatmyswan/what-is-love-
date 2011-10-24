require 'carrierwave/orm/mongoid'

class User
  include Mongoid::Document
  include Mongoid::Timestamps
         
  field :provider, type: String
  field :uid, type: String
  field :email, type: String
  field :name, type: String
  field :image_url, type: String
  field :background, type: String, default: "reeds"
  field :ult_outcome, type: String
  field :ult_purpose, type: String
  
  has_many :goals
  has_many :groups
  
  after_create :create_personal
  after_create :create_professional
  
  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["user_info"]["name"]
      user.image_url = auth["user_info"]["image"]
    end
  end
  
  protected
  def create_personal
    group = Group.new
    group.master_title = 'Personal'
    group.title = 'Capture'
    group.user_id = self.id
    group.save
  end
  
  def create_professional
    group = Group.new
    group.master_title = 'Professional'
    group.title = 'Capture'
    group.user_id = self.id
    group.save
  end


end

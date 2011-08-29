require 'carrierwave/orm/mongoid'

class User
  include Mongoid::Document
  include Mongoid::Timestamps
         
  field :provider, type: String
  field :uid, type: String
  field :email, type: String
  field :name, type: String
  field :image_url, type: String
  
  has_many :tasks
  has_many :blocks
  
  after_create :create_inbox
  
  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["user_info"]["name"]
      user.image_url = auth["user_info"]["image"]
    end
  end
  
  protected
  def create_inbox
    group = Group.new
    group.title = 'Personal'
    group.user_id = self.id
    group.save
  end


end

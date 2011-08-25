require 'carrierwave/orm/mongoid'

class User
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
         
  field :email, type: String
  field :name, type: String
  
  mount_uploader :image, AvatarUploader
  
  has_many :tasks
  has_many :blocks
  
  after_create :create_inbox
  
  protected
  def create_inbox
    group = Group.new
    group.title = 'Inbox'
    group.user_id = self.id
    group.save
  end

end

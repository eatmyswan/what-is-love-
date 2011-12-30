class User
  include Mongoid::Document
  
  field :name, type: String
  field :vision, type: String
  field :purpose, type: String
  field :avatar, type: String
  
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  
  has_many :groups
  has_many :emails
  has_many :ltasks, class_name: "tasks", inverse_of: :luser
  embeds_many :goals
  embeds_many :images
  
  after_create :create_inbox
  
  protected
  def create_inbox
    group = Group.new
    group.title = 'Action List'
    group.user_id = self.id
    group.save
  end

end

class User
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name, type: String
  field :vision, type: String
  field :purpose, type: String
  field :avatar, type: String
  field :sound, type: Boolean, default: true
  field :last_notice_view, type: DateTime
  
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  
  has_many :groups
  has_many :emails
  has_many :ltasks, class_name: 'Task', inverse_of: :luser
  has_many :notices
  has_many :vision_groups, :as => :dreamer
  embeds_many :goals
  embeds_many :images
  
  after_create :create_inbox

  # Helper method to create notices
  def notify(type,subject,target=nil)
    self.notices.create :type => type, :subject => subject, :target => target
  end

  def unread_notices
    self.notices.where(:created_at => self.last_notice_view..DateTime.now)
  end

  def read_notices!
    self.last_notice_view = DateTime.now
    self.save
  end

  protected
  def create_inbox
    group = Group.new
    group.title = 'Action List'
    group.user_id = self.id
    group.save
  end

end

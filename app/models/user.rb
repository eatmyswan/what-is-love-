class User
  include Mongoid::Document
  include Mongoid::Timestamps
         
  field :provider, type: String
  field :uid, type: String
  field :email, type: String
  field :name, type: String
  field :twitter_img, type: String
  field :vision, type: String
  field :purpose, type: String
  
  has_many :groups
  embeds_many :goals
  embeds_many :images
  
  after_create :create_inbox
  
  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["user_info"]["name"]
      user.twitter_img = auth["user_info"]["image"]
    end
  end
  
  protected
  def create_inbox
    group = Group.new
    group.title = 'Inbox'
    group.user_id = self.id
    group.save
  end

end

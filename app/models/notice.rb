class Notice
  include Mongoid::Document
  include Mongoid::Timestamps
  field :type_num, type: Integer, default: 0
  
  # The user being notified
  belongs_to :user

  # Each notice must have a subject
  belongs_to :subject, :polymorphic => true
  validates :subject, :presence => true

  # Some notice types involve the subject targeting an object
  # We can't name it `object` because Mongoid gives a strong warning
  belongs_to :target, :polymorphic => true

  def self.types
    @_types ||= {

    # A user sends a leverage email to an email address.
    #   Subject: The email sent
    #   Target:  The task being leveraged
    'lev-send'   => 1000,

    # A user accepts a leveraged task.
    #   Subject: The accepting user
    #   Target:  The task being accepted
    'lev-accept' => 1001,

    # A user rejects a leverage.
    #   Subject: The rejecting user
    #   Target:  The task being rejected
    'lev-reject' => 1002,
    }
  end

  def type
    Notice.types.select {|name,num| num == self.type_num }.first[0]
  end

  def type=(type_str)
    self.type_num = Notice.types[type_str] || 0
  end

end

class Notification
  include Mongoid::Document
  include Mongoid::Timestamps
  field :type_num, type: Integer, default: 0
  
  belongs_to :user
  belongs_to :subject, :polymorphic => true

  def self.types
    @_types ||= {
      'group-create' => 123
    }
  end

  def type
    Notification.types.select {|name,num| num == self.type_num }.first[0]
  end

  def type=(type_str)
    self.type_num = Notification.types[type_str] || 0
  end

end

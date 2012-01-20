class Invite
  include Mongoid::Document

  field :name, type: String
  field :email, type: String
  field :type, type: String

  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/,
                                 :message => 'is invalid' },
                    :uniqueness => { :scope => :type,
                                     :case_sensitive => false,
                                     :message => 'taken' }
  validates :type, :format => { :with => /^(desktop|mobile)$/,
                                :message => 'is invalid' }

  index :email, unique: true, drop_dups: true

end

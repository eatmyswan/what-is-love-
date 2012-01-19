class Invite
  include Mongoid::Document

  field :name, type: String
  field :email, type: String

  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/,
                                 :message => 'is invalid' },
                    :uniqueness => { :case_sensitive => false,
                                     :message => 'taken' }

  index :email, unique: true, drop_dups: true

end

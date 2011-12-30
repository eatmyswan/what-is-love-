class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :must, type: Boolean, default: false
  field :complete, type: Boolean, default: false
  field :sort, type: Integer, default: 0
  field :capture_sort, type: Integer, default: 0
  field :mylife_sort, type: Integer, default: 0
  field :start, type: DateTime, default: nil
  field :end, type: DateTime, default: nil
  field :min_duration, type: Integer, default: 0
  field :max_duration, type: Integer, default: 0
  field :committed, type: Boolean, default: false
  field :scheduled, type: Boolean, default: false
  field :outcome, type: Boolean, default: false
  field :purpose, type: String, default: nil
  field :parent_id, type: String, default: nil
  field :plan, type: Boolean, default: false
  field :week, type: Boolean, default: false
  field :readOnly, type: Boolean, default: false

  belongs_to :user
  belongs_to :group
  belongs_to :email
  embeds_many :notes
  has_many :reminders
  belongs_to :luser, class_name: 'User', inverse_of: :ltasks
  
  index :user_id
  index :group_id
  index :parent_id
  index :sort
  index :capture_sort
  index :mylife_sort
  index :plan
  index :week
  index :outcome
  index :scheduled
  index :complete
  
  scope :unplanned, where(queued: false).and(scheduled: false).order_by([:sort, :asc])
  scope :incomplete, where(complete: false).and(parent_id: nil).order_by([:mylife_sort, :asc])
  scope :complete, where(complete: true).and(parent_id: nil).order_by([:sort, :asc])
  
  validates_length_of :title, minimum: 1, message: "task cannot be blank."
  
  before_save :check_start
  before_save :check_duration
  before_save :check_must
  before_save :check_outcome
  before_save :nil_if_blank
  
  private
  
  def nil_if_blank
    self.start = nil if self.start.blank?
    self.parent_id = nil if self.parent_id.blank?
    self.end = nil if self.end.blank?
    self.min_duration = 0 if self.min_duration.blank?
    self.max_duration = 0 if self.max_duration.blank?
  end
  
  def check_start
    if self.title.match("#today")
      self.start = Date.today.beginning_of_day
      self.title.slice! "#today"
    elsif self.title.match("#tomorrow")
      self.start = Date.tomorrow.beginning_of_day
      self.title.slice! "#tomorrow"
    elsif self.title.match("#nextweek")
      self.start = Date.today.next_week
      self.title.slice! "#nextweek"
    elsif self.title.match("#nextmonth")
      self.start = Date.today.next_month
      self.title.slice! "#nextmonth"
    elsif self.title.match(/#(\d+)days/)  
      self.start = Date.today.beginning_of_day + m[1].to_i.days
      self.title.slice! m[0].to_s
    end
  end
  
  def check_duration
    if m = self.title.match(/#((\d+)h)?((\d+)m)?(-)?((\d+)h)?((\d+)m)?/)  
      min_duration = 0
      max_duration = 0
      if m[2]
        min_duration = min_duration + (m[2].to_i * 60)
      end
      if m[4]
        min_duration = min_duration + m[4].to_i
      end
      if min_duration > 0
        self.min_duration = min_duration
      end
      if m[7]
        max_duration = max_duration + (m[7].to_i * 60)
      end
      if m[9]
        max_duration = max_duration + m[9].to_i
      end
      if max_duration > 0 && min_duration > 0 && min_duration < max_duration
        self.max_duration = max_duration
      end
      self.title.slice! m[0].to_s
    end
  end
  
  def check_must
    if self.title.match(/\A\*/)
      self.must = true
      self.title.slice! '*'
    end
  end
  
  def check_outcome
    if self.title.match(/\A\!/)
      self.outcome = true
      self.title.slice! '!'
    end
  end
  
end
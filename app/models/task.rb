class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :task, type: String
  field :must, type: Boolean, default: false
  field :complete, type: Boolean, default: false
  field :sort, type: Integer, default: 0
  field :starts_at, type: DateTime, default: nil
  field :due_by, type: DateTime, default: nil
  field :min_duration, type: Integer, default: nil
  field :max_duration, type: Integer, default: nil
  field :queued, type: Boolean, default: false
  field :scheduled, type: Boolean, default: false
  field :leverage, type: String, default: nil
  field :notes, type: String, default: nil
  field :color, type: String, default: '#1679c3'
  field :outcome, type: Boolean, default: false
  field :purpose, type: String, default: nil
  field :collapsed, type: Boolean, default: true
  field :parent_id, type: String, drault: nil

  belongs_to :user
  belongs_to :group
  embeds_many :emails
  embeds_many :notes
  has_many :reminders
  
  index :user_id
  index :group_id
  index :parent_id
  
  scope :unplanned, where(queued: false).and(scheduled: false).order_by([:sort, :asc])
  scope :incomplete, where(complete: false).and(parent_id: nil).order_by([:sort, :asc])
  scope :complete, where(complete: true).and(parent_id: nil).order_by([:sort, :asc])
  
  validates_length_of :task, minimum: 1, message: "task cannot be blank."
  
  before_save :check_starts_at
  before_save :check_duration
  before_save :check_must
  before_save :nil_if_blank
  
  private
  def nil_if_blank
    self.leverage.blank? ? self.leverage = nil : return
    self.min_duration.blank? ? self.min_duration = nil : return
    self.starts_at.blank? ? self.starts_at = nil : return
    self.parent_id.blank? ? self.parent_id = nil : return
  end
  
  def check_starts_at
    if self.task.match("#today")
      self.starts_at = Date.today.beginning_of_day
      self.task.slice! "#today"
    elsif self.task.match("#tomorrow")
      self.starts_at = Date.tomorrow.beginning_of_day
      self.task.slice! "#tomorrow"
    elsif self.task.match("#nextweek")
      self.starts_at = Date.today.next_week
      self.task.slice! "#nextweek"
    elsif self.task.match("#nextmonth")
      self.starts_at = Date.today.next_month
      self.task.slice! "#nextmonth"
    elsif m = self.task.match(/#(\d+)days/)  
      self.starts_at = Date.today.beginning_of_day + m[1].to_i.days
      self.task.slice! m[0].to_s
    end
  end
  
  def check_duration
    if m = self.task.match(/#((\d+)h)?((\d+)m)?(-)?((\d+)h)?((\d+)m)?/)  
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
      self.task.slice! m[0].to_s
    end
  end
  
  def check_must
    if self.task.match(/\A\*/)
      self.must = true
      self.task.slice! '*'
    end
  end
  
end
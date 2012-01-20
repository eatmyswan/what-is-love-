class Project
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String

  has_one :project_from_task, class_name: "Task", inverse_of: :task_to_project
  has_many :tasks
  belongs_to :user
  belongs_to :group

end

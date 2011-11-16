module WeeksHelper
  def month_link(month_date)
    link_to(I18n.localize(month_date, :format => "%B"), {:month => month_date.month, :year => month_date.year})
  end
  
  # custom options for this calendar
  def event_calendar_opts
    { 
      :year => Date.new(@date.year),
      :month => Date.new(@date.month),
      :event_strips => @tasks,
      :month_name_text => I18n.localize(@start_date, :format => "%B %Y"),
      :previous_month_text => "<< " + month_link(@start_date.prev_month),
      :next_month_text => month_link(@start_date.next_month) + " >>"    }
  end

  def event_calendar
    # args is an argument hash containing :event, :day, and :options
    calendar event_calendar_opts do |args|
      task = args[:task]
      %(#{h(task.task)})
    end
  end
end

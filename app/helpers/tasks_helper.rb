module TasksHelper
  
  def schedule_date(date)
    if date.today?
      "Today"
    elsif Date.tomorrow.beginning_of_day == date.beginning_of_day
      "Tomorrow"
    elsif date < Date.today.end_of_week && date > Date.today.beginning_of_week
      date.strftime('%A')
    else
      date.strftime('%m/%d/%y')
    end
  end
  
  def min_duration(min_duration)
    if min_duration >= 60
      h = min_duration / 60
      m = min_duration % 60
      m > 0 ? "#{h}h#{m}m" : "#{h}h"
    else
      "#{min_duration}m"
    end
  end
  
  def max_duration(max_duration)
    if max_duration >= 60
      h = max_duration / 60
      m = max_duration % 60
      m > 0 ? "-#{h}h#{m}m" : "-#{h}h"
    else
      "-#{max_duration}m"
    end
  end

end

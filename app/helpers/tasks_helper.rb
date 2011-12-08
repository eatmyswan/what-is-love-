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
    elsif min_duration > 0
      "#{min_duration}m"
    end
  end
  
  def max_duration(max_duration)
    if max_duration >= 60
      h = max_duration / 60
      m = max_duration % 60
      m > 0 ? "- #{h}h#{m}m" : "- #{h}h"
    else
      "- #{max_duration}m"
    end
  end
  
  def total_time(time)
    hour = time.to_i / 60
		min = time.to_i % 60
		hour = hour.to_s
		min = min.to_s
		hour = hour.length == 1 ? '0' + hour : hour
		min = min.length == 1 ? '0' + min : min
		"#{hour}:#{min}"
  end


end

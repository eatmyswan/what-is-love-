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
  
  def duration(min_duration)
    if min_duration >= 60
      h = min_duration / 60
      m = min_duration % 60
      m > 0 ? "#{sprintf '%02d', h}:#{sprintf '%02d', m}" : "#{sprintf '%02d', h}:00"
    elsif min_duration > 0
      "00:#{sprintf '%02d', min_duration}"
    end
  end


end

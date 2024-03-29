module NoticesHelper

  def notice_title(notice)
    type, subject, target = notice.type, notice.subject, notice.target

    case type
    when 'lev-send'
      "Action emailed to #{subject.to_email}"
    when 'lev-accept'
      if subject == current_user
        "You accepted \"#{target.title}\""
      else
        "#{subject.name} accepted \"#{target.title}\""
      end
    when 'lev-reject'
      "#{subject.name} rejected \"#{target.title}\""
    else
      puts "UNKNOWN NOTICE TYPE:"
      puts "  > type:#{type}; subject:#{subject.inspect}; target:#{target.inspect}"
    end
  end

  def notice_href(notice)
    type, subject, target = notice.type, notice.subject, notice.target

    case type
    when 'lev-send', 'lev-accept', 'lev-reject'
      group_path(target.group, :task_id => target.id)
    else
      puts "UNKNOWN NOTICE TYPE:"
      puts "  > type:#{type}; subject:#{subject.inspect}; target:#{target.inspect}"
      root_path
    end
  end

  def notice_title_detailed(notice)
    type, subject, target = notice.type, notice.subject, notice.target

    case type
    when 'lev-send'
      "You emailed the action #{task_link target} to #{subject.to_email}"
    when 'lev-accept'
      if subject == current_user
        "You accepted the action: #{task_link target}"
      else
        "#{subject.name} has accepted your action #{task_link target}"
      end
    when 'lev-reject'
      "#{subject.name} has rejected your action #{task_link target}"
    else
      puts "UNKNOWN NOTICE TYPE:"
      puts "  > type:#{type}; subject:#{subject.inspect}; target:#{target.inspect}"
    end
  end

  def task_link(task, title=nil)
    link_to "#{title || task.title}", group_path(task.group), :remote => true
  end

  def time_ago_or_time_stamp(from_time, to_time = Time.now, detail = false)
    from_time = from_time.to_time if from_time.respond_to?(:to_time)
    to_time = to_time.to_time if to_time.respond_to?(:to_time)
    distance_in_minutes = (((to_time - from_time).abs)/60).round
    distance_in_seconds = ((to_time - from_time).abs).round
    case distance_in_minutes
      when 0..1           then time = (distance_in_seconds < 60) ? "Just now" : '1m ago'
      when 2..59          then time = "#{distance_in_minutes}m ago"
      when 60..90         then time = "1 hour ago"
      when 90..1440       then time = "#{(distance_in_minutes.to_f / 60.0).round} hours ago"
      when 1440..2160     then time = '1 day ago' # 1-1.5 days
      when 2160..2880     then time = "#{(distance_in_minutes.to_f / 1440.0).round} days ago" # 1.5-2 days
      else time = from_time.strftime("%b %d")
    end
    return time_stamp(from_time) if (detail && distance_in_minutes > 2880)
    return time
  end
end

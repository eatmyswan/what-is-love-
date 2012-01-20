class UserMailer < ActionMailer::Base

  default :from => "noreply@timemaster.com"

  def confirm_beta_request(invite)
    @invite = invite
    mail(
      :to => invite.email,
      :subject => "[RPM] Your Time Master RPM request was received"
    )
  end

  def leverage_task(email, task)
    @email = email
    @task = task
    mail(:to => email.to_email, :subject => "TimeMaster - #{@email.user.name} has leveraged you" )
  end

  def accept_task(email, name, task)
    @name = name
    @task = task
    mail(:to => email, :subject => "TimeMaster - #{@name} has accepted your leverage" )
  end

  def reject_task(email)
    mail(:to => email, :subject => "TimeMaster - Rejected your leverage" )
  end
end

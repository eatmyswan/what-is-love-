class UserMailer < ActionMailer::Base
  
  default :from => "noreply@rpmapp.com"
  
  def leverage_task(email, task, current_user)
    @email = email
    @task = task
    @current_user = current_user
    mail(:to => email.recipient, :from => "RPM App <#{email.sender}>", :subject => email.subject )
  end
end

class UserMailer < ActionMailer::Base
  
  default :from => "noreply@rapidplanapp.com"
  
  def leverage_task(email)
    @email = email
    mail(:to => email, :subject => "Leveraged Task")
  end
end

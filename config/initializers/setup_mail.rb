ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "timemaster.com",
  :authentication       => "plain",
  :user_name            => "timemasterrpm@gmail.com",
  :password             => "Balboa12c5!",
  :enable_starttls_auto => true
}

ActionMailer::Base.delivery_method = :smtp
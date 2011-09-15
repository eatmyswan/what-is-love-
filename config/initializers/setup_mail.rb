ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :domain               => "localhost:3000",
  :authentication       => "plain",
  :user_name            => "stevendoyledesign@gmail.com",
  :password             => "SPD12c5!",
  :enable_starttls_auto => true
}

ActionMailer::Base.delivery_method = :smtp
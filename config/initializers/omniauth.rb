Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.production?
    provider :twitter, 'AavCBytb8S9ndh2Ig3pw', 'pnjOvEkVQkQmEwq6oBCiXGpu4nJv3hxDtb7A91EV4'
  end
  if Rails.env.development?
    provider :twitter, 'wl76DAJ0B1oPuxrMsvLAQ', 'CixHUtWwc7b2LcNcyvOlAbYS1emJPl3SLsMXusJg7I'
  end
end
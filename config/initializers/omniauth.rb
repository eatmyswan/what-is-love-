Rails.application.config.middleware.use OmniAuth::Builder do
  if Rails.env.production?
    provider :twitter, 'MY5Q3dday6r7trRfmEig', 'GITEV7xENLMnpBNtED8hCnkwUnsOCIxYKLdEKqu2yo'
  end
  if Rails.env.development?
    provider :twitter, 'wl76DAJ0B1oPuxrMsvLAQ', 'CixHUtWwc7b2LcNcyvOlAbYS1emJPl3SLsMXusJg7I'
  end
end
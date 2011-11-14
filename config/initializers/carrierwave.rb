CarrierWave.configure do |config|
  config.cloud_files_username = "blogcatalog"
  config.cloud_files_api_key = "b00f87c26cc057eb93060ed2defa1993"
  config.ignore_integrity_errors = false
  config.ignore_processing_errors = false
  config.validate_integrity = false
  config.validate_processing = false
end
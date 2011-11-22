# encoding: utf-8
require 'carrierwave/processing/mime_types'

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes

  process :set_content_type

  # Choose what kind of storage to use for this uploader:
  storage :cloud_files
   
  def cloud_files_container
    "test"
  end
  
  def cloud_files_cdn_host
    "c3403180.r80.cf0.rackcdn.com"
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
   "image"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
   "/assets/clear.gif"
  end
  
  process :resize_to_limit => [800, 600]

  version :thumb do
    process :convert => 'jpg'
    process :resize_to_fill => [40, 40]
  end
  
  version :tiny do
    process :convert => 'jpg'
    process :resize_to_fill => [18, 18]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_white_list
    %w(jpg jpeg gif png)
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end
  
  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end

end
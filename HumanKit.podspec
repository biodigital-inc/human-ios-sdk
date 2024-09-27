# coding: utf-8
Pod::Spec.new do |s|
  s.name         = "HumanKit"
  s.version      = "134.1"
  s.summary      = "HumanKit by BioDigital Inc."
  s.description  = "The BioDigital HumanKit framework for iOS makes it easy to add 3D interactive anatomy and health condition models to any iOS application."
  s.homepage     = "http://developer.biodigital.com"
   s.license      = { :type => "MIT", :file => "LICENSE" }

  # ――― Author Metadata  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.author             = { "Gary Herman" => "gary@biodigital.com" }
  s.social_media_url   = "http://twitter.com/biodigitalhuman"

  # ――― Platform Specifics ―――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.platform     = :ios, "12.0"

  # ――― Source Location ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  s.source       = { :git => "https://github.com/biodigital-inc/human-ios-sdk.git", :tag => s.version }

  # ――― Project Linking ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
    s.vendored_frameworks = 'HumanKit.framework'
end

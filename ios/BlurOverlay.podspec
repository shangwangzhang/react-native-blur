
Pod::Spec.new do |s|
  s.name         = "BlurOverlay"
  s.version      = "1.0.0"
  s.summary      = "BlurOverlay"
  s.homepage     = "https://github.com/shangwangzhang/react-native-blur"
  s.license      = "MIT"
  s.author       = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/shangwangzhang/react-native-blur", :tag => "master" }
  s.source_files = "*.{h,m}"

  s.dependency "React"

end
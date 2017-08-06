Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'],
    scope: 'public_profile', info_fields: 'id,name,link'
end

OmniAuth.config.test_mode = true

OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new({
  :provider => 'facebook',
  :uid => '123545',
  :info => {
    :name => "John Doe"
  }
})

include ActionDispatch::TestProcess

FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    # image {File.open("#{Rails.root}/public/images/no_image.jpg")}
    image { Rack::Test::UploadedFile.new(Rails.root.join('public/images/no_image.jpg'), 'image/jpg') }
    user
    group
  end
end

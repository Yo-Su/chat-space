FactoryBot.define do
    content {Faker::Lorem.sentence}
    image   {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user_id
    group_id
  end
end
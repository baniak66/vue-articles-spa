FactoryGirl.define do
  factory :comment do
    name "comment body"
    association :article, factory: :article
  end
end

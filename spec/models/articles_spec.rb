require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'database columns' do
    it { should have_db_column :title }
    it { should have_db_column :content }
    it { should have_db_column :readed }

  end

  describe 'associations' do
    it { is_expected.to have_many :comments }
  end
end

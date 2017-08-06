require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'database columns' do
    it { should have_db_column :name }
    it { should have_db_column :article_id }
  end

  describe 'associations' do
    it { is_expected.to belong_to :article }
  end
end

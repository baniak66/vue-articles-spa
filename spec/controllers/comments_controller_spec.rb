require 'rails_helper'

RSpec.describe CommentsController, type: :controller do

  let!(:comment) { create :comment }

  describe 'anonymous user' do

    it "can't add comment" do
      post :create, params: { article_id: comment.article_id, id: comment.id }
      expect(JSON.parse(response.body)["error"]["message"]).to eq("Authentication problem")
    end

    it "can't delete comment" do
      delete :destroy, params: { article_id: comment.article_id, id: comment.id }
      expect(JSON.parse(response.body)["error"]["message"]).to eq("Authentication problem")
    end
  end

  describe 'logged user' do

    before :each do
      @user = User.from_omniauth(OmniAuth.config.mock_auth[:facebook])
      session[:user_id] = @user.id
    end

    let(:article) { create :article }
    let!(:params) do
      { params: { article_id: article.id, comment: { name: "new comment" } } }
    end

    it "can create comment" do
      expect { post :create, params }.to change(Comment, :count).by(1)
      post :create, params
      expect(JSON.parse(response.body)["name"]).to eq("new comment")
    end

    it "can delete comment" do
      expect { delete :destroy, params: { article_id: comment.article_id, id: comment.id } }
      .to change(Comment, :count).by(-1)
    end

  end
end

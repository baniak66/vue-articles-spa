require 'rails_helper'

RSpec.describe ArticlesController, type: :controller do

  let!(:article) { create :article }

  describe 'anonymous user' do

    context 'retrives list' do
      let!(:articles) { create_list :article, 9 }
      it 'of articles' do
        get :index
        expect(response).to be_success
        expect(Article.all.length).to eq(10)
      end
    end

    it "can't add article" do
      post :create
      expect(JSON.parse(response.body)["error"]["message"]).to eq("Authentication problem")
    end

    it "can't delete article" do
      delete :destroy, params: { id: article.id }
      expect(JSON.parse(response.body)["error"]["message"]).to eq("Authentication problem")
    end
  end

  describe 'logged user' do

    before :each do
      @user = User.from_omniauth(OmniAuth.config.mock_auth[:facebook])
      session[:user_id] = @user.id
    end

    let!(:params) do
      {params: { article: {title: "new title", content: "new content"} }}
    end

    it "can create article" do
      expect { post :create, params }.to change(Article, :count).by(1)
      post :create, params
      expect(JSON.parse(response.body)["title"]).to eq("new title")
      expect(JSON.parse(response.body)["content"]).to eq("new content")
    end

    it "can delete article" do
      expect { delete :destroy, params: { id: article.id } }.to change(Article, :count).by(-1)
    end

  end
end

class ArticlesController < ApplicationController

  before_action :authenticate, only: :create
  def app
  end

  def index
    @articles = Article.all
    render json: @articles, :include => [:comments]
  end

  def create
    @article = Article.create(article_params)
    if @article.save
      render :json => @article, :include => [:comments]
    end
  end

  def destroy
    @article = Article.find(params[:id])
    if @article.delete
      render :json => @article
    end
  end

  def update
    @article = Article.find(params[:id])
    if @article.update article_params
      render :json => @article
    end
  end

  private

  def article_params
    params.require(:article).permit(:content, :readed)
  end

  def authenticate
    unless current_user
      render json: { "error": { "message": "Authentication problem" } }, status: 401
    end
  end

end

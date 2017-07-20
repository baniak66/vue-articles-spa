class ArticlesController < ApplicationController

  def app
  end

  def index
    @articles = Article.all
    render :json => @articles
  end

  def create
    @article = Article.create(article_params)
    if @article.save
      render :json => @article
    end
  end

  def destroy
    @article = Article.find(params[:id])
    if @article.delete
      render :json => @article
    end
  end

  private

  def article_params
    params.require(:article).permit(:content)
  end

end

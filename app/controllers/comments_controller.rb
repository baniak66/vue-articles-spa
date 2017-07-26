class CommentsController < ApplicationController

  before_action :authenticate, only: :create

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.create(comment_params)
    if @comment.save
      render :json => @comment
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:name)
  end

  def authenticate
    unless current_user
      render json: { "error": { "message": "Authentication problem" } }, status: 401
    end
  end

end
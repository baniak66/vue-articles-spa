class AddStatusToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :readed, :boolean, default: false
  end
end

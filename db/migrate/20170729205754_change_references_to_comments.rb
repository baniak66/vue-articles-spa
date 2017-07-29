class ChangeReferencesToComments < ActiveRecord::Migration[5.1]
  def change
    remove_reference :comments, :article, index: true, foreign_key: true
    add_reference :comments, :article, index: true, foreign_key: {on_delete: :cascade}
  end
end

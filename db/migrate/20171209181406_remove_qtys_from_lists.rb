class RemoveQtysFromLists < ActiveRecord::Migration[5.1]
  def change
    remove_column :lists, :qty_not_done, :string
    remove_column :lists, :qty_done, :string
  end
end

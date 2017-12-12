class AddQtyToLists < ActiveRecord::Migration[5.1]
  def change
    add_column :lists, :qty, :string
    add_index :lists, :qty
  end
end

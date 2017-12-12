class AddAtyToLists < ActiveRecord::Migration[5.1]
  def change
    add_column :lists, :qty_done, :integer
    add_column :lists, :qty_not_done, :integer


    add_index :lists, :qty_not_done
    add_index :lists, :qty_done
  end
end

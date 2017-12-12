class AddTimeToTasks < ActiveRecord::Migration[5.1]
  def change
    add_column :tasks, :time, :string
    add_index :tasks, :time
  end
end

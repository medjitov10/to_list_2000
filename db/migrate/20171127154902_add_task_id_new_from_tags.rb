class AddTaskIdNewFromTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :tasks_id, :integer, array: true
  end
end

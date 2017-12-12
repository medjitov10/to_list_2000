class AddTasksFromTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :tasks_id, :integer, array: true, default: []
  end
end

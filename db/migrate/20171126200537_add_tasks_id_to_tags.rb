class AddTasksIdToTags < ActiveRecord::Migration[5.1]
  def change
    add_column :tags, :tasks_id, :string, array: true, default: []
  end
end

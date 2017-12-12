class RemoveTasksFromTags < ActiveRecord::Migration[5.1]
  def change
    remove_column :tags, :tasks_id
  end
end

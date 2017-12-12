class RemoveTaskIdFromTags < ActiveRecord::Migration[5.1]
  def change
    remove_column :tags, :task_id, :intger
  end
end

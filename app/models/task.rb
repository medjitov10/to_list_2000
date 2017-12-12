# == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  title      :string
#  done       :boolean
#  list_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  time       :string
#

class Task < ApplicationRecord
  belongs_to :list
  validates :title, presence: :true
end

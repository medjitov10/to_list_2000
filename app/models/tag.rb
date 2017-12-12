# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tasks_id   :integer          is an Array
#

class Tag < ApplicationRecord
  belongs_to :user
  validates :name, presence: :true
end

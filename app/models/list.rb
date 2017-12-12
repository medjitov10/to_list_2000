# == Schema Information
#
# Table name: lists
#
#  id           :integer          not null, primary key
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :integer
#  qty          :string
#  qty_done     :integer
#  qty_not_done :integer
#

class List < ApplicationRecord
  has_many :tasks
  belongs_to :user
  validates :title, presence: :true
end

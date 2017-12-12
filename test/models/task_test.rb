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

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

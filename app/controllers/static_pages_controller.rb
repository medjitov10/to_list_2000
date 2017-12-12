class StaticPagesController < ApplicationController
  before_action :authenticate_user!
  def root
  end
end

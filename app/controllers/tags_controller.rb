class TagsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @user = current_user
    render json: @user.tags
  end

  def show
    @tag = Tag.find(params[:id])
    @tasks = @tag.tasks_id.map do |task_id|
      if !Task.find_by_id(task_id).nil?
        Task.find_by_id(task_id)
      end
    end
    render json: @tasks.select{|task| !task.nil?}
  end

  def create
    @tags = []
    params[:name].each do |tag|
      @tag = Tag.new(tasks_id: params[:tasks_id], name: tag)
      @user = current_user
      @user.tags << @tag
      if @tag.save
        @tags << @tag
      end
    end
    if @tags
      render json: @tags
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def update
    @tag = Tag.find(params[:id])
    @tag.tasks_id << params[:tasks_id]
    if @tag.save
      render json: @tag
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    render json: @tag.destroy
  end

  private

  def tags_params
    params.require(:tags).permit(:tasks_id, :name)
  end
end

  class TasksController < ApplicationController
  def index
    @list = List.find(params[:list_id])
    @tasks = @list.tasks
    render json: @tasks.order('created_at ASC')
  end

  def create
    @list = List.find(params[:list_id])
    @task = @list.tasks.build(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: 404
    end

  end

  def destroy
    @task = Task.find(params[:id])
    if @task.destroy
      render json: @task
    end
  end

  private
  def task_params
    params.require(:task).permit(:title, :done, :list_id, :time)
  end

end

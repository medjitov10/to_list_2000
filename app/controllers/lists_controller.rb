class ListsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index


    @timeNow = Time.now
    @lists = current_user.lists
    @lists.each do |list|
      @qty = 0;
      @qty_done = 0;
      @qty_not_done = 0;
      list.tasks.each do |task|

        if task.time
          time = task.time.split(':').join(',').split('-').join(',').split('T').join(',').split(',');
          year = time[0]
          month = time[1]
          day = time[2]
          hour = time[3]
          minutes = time[4]
        end

        if task.done
          @qty_done +=1
        else
          if !time || Time.new(year, month, day, hour, minutes) > @timeNow
            @qty +=1
          else
            @qty_not_done +=1
          end
        end
      end
      list.update(qty: list.tasks.length, qty_done: @qty_done, qty_not_done: @qty_not_done, qty: @qty)
      list.save
    end
    respond_to do |format|
      format.json { render :json => @lists.order('created_at ASC') }
    end
  end

  def show
    @list = List.find(params[:id])
    render json: @list
  end

  def create
    @user = current_user
    @list = List.new(list_params);
    @list.qty = 0;
    @list.qty_done = 0;
    @list.qty_not_done = 0;
    @user.lists << @list
    if @list.save
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422
    end

  end

  def destroy
    @list = List.find(params[:id])
    @list.tasks.destroy_all
    if @list.destroy
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422
    end

  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

private
  def list_params
    params.require(:list).permit(:title, :user_id)
  end
end

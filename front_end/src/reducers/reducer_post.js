
import { ADD_LIST, ADD_TASK, FETCH_LIST, DELETE_LIST,
  UPDATE_LIST, DELETE_TASK, FAILED_TASK, IS_DONE }
  from '../actions/index';

const PostReducer = function (state = [], action) {

  switch (action.type) {
    case FETCH_LIST:
      return action.payload.data;

    case ADD_LIST:
      return state.concat(action.payload.data);
    case DELETE_LIST:
      return (
        state.filter( list => {
          return list.id !== action.payload.data.id;
        })
      );
    case UPDATE_LIST:
      const updateState = state;
      return updateState.map( list => {
        if (list.id === action.payload.data.id) {
          list.title = action.payload.data.title;
        }
        return list;
      });

    case ADD_TASK:
      return state.map( list => {
        if (list.id == action.payload.data.list_id) {
          list.qty++;
        }
        return list;
      });
    case DELETE_TASK:
      return state.map( list => {
        if (list.id == action.payload.data.list_id) {
          if ( action.payload.data.done ) {
            list.qty_done--;
          } else {
            if ( action.payload.data.time && new Date(action.payload.data.time) - new Date() < 0 ) {
              list.qty_not_done--;
            } else {
              list.qty--;
            }
          }
        }
        return list;
      });
    case IS_DONE:
      return state.map( list => {
        if (list.id === action.payload.data.list_id) {
          if (action.payload.data.done) {
            list.qty_done++;
            list.qty--;
          } else {
            list.qty_done--;
            list.qty++;
          }
        }
        return list;
      });
    case FAILED_TASK:
      return state.map( list =>{
        if (list.id === action.payload.list_id) {
          list.qty_not_done++;
          list.qty--;
        }
        return list;
      });
  }
  return state;
};

export default PostReducer;

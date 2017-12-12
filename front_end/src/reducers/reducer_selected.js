import { SELECT_LIST, ADD_TASK, IS_DONE, DELETE_TASK} from '../actions/index';

const SelectedReducer = function (state = null, action) {
  switch (action.type) {

    case SELECT_LIST:
      if (action.payload === null) {
        return null;
      }
      return action.payload.data;

    case ADD_TASK:
      return state.concat(action.payload.data);
    case DELETE_TASK:
      return state.filter( task => task.id !== action.payload.data.id );
    case IS_DONE:
      return state.map( list => {
        if ( list.id === action.payload.data.id) {
          list.done = action.payload.data.done;
        }
        return list;
      });
    default:
    return state;
  }
};

export default SelectedReducer;

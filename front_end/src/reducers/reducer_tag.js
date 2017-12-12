import { ADD_TAG, FETCH_TAGS, DELETE_TAG } from '../actions/index';
import axios from 'axios';

const TagReducer = function ( state = [], action ) {
  switch (action.type) {
    case FETCH_TAGS :
      (action.payload.data);
      return action.payload.data;
    case ADD_TAG:
      return state.concat(action.payload.data);
    case DELETE_TAG:
      return state.filter( item => {
        return item.id !== action.payload.data.id;
      });
  }
  return state;
};




export default TagReducer;

import { SELECTED_ID } from '../actions/index';

function SelectedIdReducer (state = null, action ) {

  switch (action.type) {
    case SELECTED_ID:
      return action.payload;
  }
  return state;
}

export default SelectedIdReducer;

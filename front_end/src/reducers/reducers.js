import { combineReducers } from 'redux';

import PostReducer from './reducer_post';
import SelectedReducer from './reducer_selected';
import TagReducer from './reducer_tag';
import SelectedIdReducer from './reducer_selected_id';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  lists: PostReducer,
  selectedList: SelectedReducer,
  tags: TagReducer,
  selectedId: SelectedIdReducer,
  form: formReducer
});

export default rootReducer;

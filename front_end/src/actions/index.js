import axios from 'axios';

export const FETCH_LIST = 'FETCH_LIST';
export const ADD_LIST = 'ADD_LIST';
export const SELECT_LIST = 'SELECT_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const DELETE_TASK = 'DELETE_TASK';

export const SELECTED_ID = 'SELECTED_ID';
export const ADD_TASK = 'ADD_TASK';
export const IS_DONE = 'IS_DONE';

export const FETCH_TAGS = 'FETCH_TAGS';
export const ADD_TAG = 'ADD_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const FAILED_TASK = 'FAILED_TASK';

export function fetchLists() {
  const request = axios.get('/lists');
  return {
    type: FETCH_LIST,
    payload: request
  };
}

export function addList(list) {
  const request = axios.post('/lists', list);
  return {
    type: ADD_LIST,
    payload: request,
  };
}

export function deleteList(id) {
  const request = axios.delete(`/lists/${id}`);

  return {
    type: DELETE_LIST,
    payload: request
  };
}

export function updateList(item) {
  const request = axios.put(`/lists/${item.id}`, item);
  return {
    type: UPDATE_LIST,
    payload: request
  };
}

export function selectList(list) {
  if ( list === null ) {
    return {
      type: SELECT_LIST,
      payload: null
    };
  }
  const listId= list.id;
  const request = axios.get(`/lists/${listId}/tasks`);
  return {
    type: SELECT_LIST,
    payload: request,
  };
}

export function selectedId(id) {
  return {
    type: SELECTED_ID,
    payload: id
  };
}

export function addTask(task, time, listId) {
  let tagslist = [];
  const taskAJAX = {
    title: task,
    time: time,
    done: false,
    list_id: listId
  };

  const request = axios.post(`/lists/${listId}/tasks`, taskAJAX);

  return {
    type: ADD_TASK,
    payload: request,
  };
}

export function deleteTask(task) {
  let list_id = task.list_id;
  const request = axios.delete(`/lists/${list_id}/tasks/${task.id}`);

  return {
    type: DELETE_TASK,
    payload: request
  };
}

export function failedTask(task) {
  return {
    type: FAILED_TASK,
    payload: task
  };
}

export function isDone(id, selId, done) {
  const request = axios.put(`/lists/${selId}/tasks/${id}`, {done: !done});
  return {
    type: IS_DONE,
    payload: request
  };
}


export function fetchTags() {
  const request = axios.get('/tags');
  return {
    type: FETCH_TAGS,
    payload: request
  };
}


export function selectTagList(id) {
  const request = axios.get(`/tags/${id}`);
  return {
    type: SELECT_LIST,
    payload: request,
  };
}

export function addTag(tags, tasks_id) {
  const request = axios.post('/tags/', {
    tasks_id: [tasks_id],
    name: tags
  });

  return {
    type: ADD_TAG,
    payload: request
  };
}

export function updateTag(tag_id, task_id) {
  const request = axios.put(`/tags/${tag_id}`, {tasks_id: task_id});

  return {
    type: UPDATE_TAG,
    payload: request
  };
}

export function deleteTag(tag_id) {
  const request = axios.delete(`/tags/${tag_id}`);

  return {
    type: DELETE_TAG,
    payload: request
  };
}

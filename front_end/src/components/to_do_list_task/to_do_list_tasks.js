import React from 'react';
import { connect } from 'react-redux';

import TaskForm from './task_form';
import ToDoListTaskItem from './to_do_List_task_item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class ToDoListTask extends React.Component {
  renderTasks(selectedId) {
    if ( this.props.list === null || !this.props.list.length ) {
      return <div className='to-do-list-task-text'>Add New Task</div>;
    }
    return this.props.list.map( list => {
      return (
        <div key={list.id}>
          <ToDoListTaskItem selectedId={selectedId} item={list}/>
        </div>);
    });
  }

  render() {
    const { lists } = this.props;
    // If user did not choose list yet;
    if (!this.props.selectedList) {
      return (
          <div className='to-do-list-task-input'>Choose Existing List</div>
      );
    }
    // If user delete current list
    if ( this.props.selectedId === null ) {
      return (
      <div>
        {this.renderTasks(this.props.selectedId)}
      </div>
    );
    }
    // If user click on list
    return (
      <div>
        <TaskForm />
        {this.renderTasks(this.props.selectedId)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.lists,
    selectedList: state.selectedList,
    selectedId: state.selectedId,
  };
}

export default connect(mapStateToProps)(ToDoListTask);

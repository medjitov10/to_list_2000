import React from 'react';
import { connect } from 'react-redux';
import ToDoListTask from './to_do_list_tasks';
class SelectedList extends React.Component {

  render() {
    return (
      <div>
          <ToDoListTask list={this.props.selectedList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedList: state.selectedList,
  };
}

export default connect(mapStateToProps)(SelectedList);

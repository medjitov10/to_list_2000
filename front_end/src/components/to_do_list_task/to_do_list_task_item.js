import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isDone, deleteTask, failedTask } from '../../actions/index';
import Time from 'react-time';

class ToDoListTaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: this.props.item.done,
      onMouseOver: false,
      flag: new Date(this.props.item.time) - new Date() > 0 };
  }

  onInputClick() {
    this.setState({done: !this.state.done});
    this.props.isDone(this.props.item.id, this.props.selectedId, this.state.done);
  }

  onDeleteClick() {
    this.props.deleteTask(this.props.item);
  }

  onTaskOver() {
    this.setState({ onMouseOver: true });
    if (this.state.flag && new Date(this.props.item.time) - new Date() < 0){
      this.props.failedTask(this.props.item);
      this.setState({ flag: false });
    }
  }

  onTaskOut() {
    this.setState({ onMouseOver: false });
  }



  render() {

    const DueDate = new Date(this.props.item.time);
    const toLate = this.props.item.time ? DueDate - new Date() : true;
    const deleteClass = this.state.onMouseOver ? 'fa fa-times fa-md' : 'fa fa-times fa-md invisible';
    const titleClass = this.state.done ?
    'to-do-list-task-item-title to-do-list-task-item-title-done' :
    'to-do-list-task-item-title';
    const was = toLate < 0 ? 'was' : '';

    let divClass = toLate < 0 ? 'to-do-list-task-item-main toLate' : 'to-do-list-task-item-main';
    if (this.state.done) divClass = 'to-do-list-task-item-main success';
    return (
      <div className={divClass}
        onMouseOver={this.onTaskOver.bind(this)}
        onMouseOut={this.onTaskOut.bind(this)}
        >
        <input
          onMouseOver={this.onTaskOver.bind(this)}
          disabled={ toLate < 0 }
          className='to-do-list-task-item-checkbox'
          type="checkbox"
          onClick={this.onInputClick.bind(this)}
          defaultChecked={this.state.done}
        />
        <span className={titleClass}>{this.props.item.title}</span>
        {

          this.props.item.time ?
            <span className='timeClass'>This {was} <Time value={DueDate} titleFormat="YYYY/MM/DD HH:mm" relative /></span> :
            <span className='timeClass'>Time was not set</span>
        }
        <span className={deleteClass} onClick={this.onDeleteClick.bind(this)}><i aria-hidden="true"></i></span>
      </div>
    );
  }
}



export default connect(null, { isDone, deleteTask, failedTask })(ToDoListTaskItem);

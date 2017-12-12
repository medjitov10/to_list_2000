import React from 'react';
import { connect } from 'react-redux';

import { selectList, deleteList, updateList, selectedId } from '../../actions/index';

class ToDoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onEditOver: false,
      onEditClick: false,
      onDeleteOver: false,
      listItemClass: `list-group-item to-do-list-item-li `
    };
  }

  componentWillReceiveProps() {
    setTimeout( () => {
      this.setState({ listItemClass: `list-group-item to-do-list-item-li
        ${this.props.item.id === this.props.Id ? ' to-do-list-item-li-active' : ' '}` });
    }, 50);
  }

  onSelectClick() {
    this.props.selectedId(this.props.item.id);
    this.props.selectList(this.props.item);
  }

  onDeleteClick() {
    this.props.deleteList(this.props.item.id);
    this.props.selectList(null);
  }

  onSpanOver() {
    this.setState(
      {
        onDeleteOver: !this.state.onDeleteOver,
        onEditOver: !this.state.onEditOver,
        title: this.props.item.title
      });
  }

  onEditClick() {
    this.setState({ onEditClick: !this.state.onEditClick});
  }

  onEditSubmit(e) {
    e.preventDefault();
    this.setState({
      onEditOver: false,
      onEditClick: false,
      onDeleteOver: false });
    this.props.updateList({
      title: this.state.title,
      id: this.props.item.id
    });
  }

  onInputChange(e) {
    this.setState({title: e.target.value});
  }


  render() {


    let deleteClass = 'fa fa-trash fa-lg delete-list ';
    deleteClass += this.state.onDeleteOver ? 'visible' : 'invisible';

    let editClass = 'fa fa-pencil fa-lg ';
    editClass += this.state.onEditOver ? 'visible' : 'invisible';

    let qtyClass = ' ';
    qtyClass += this.state.onEditOver ? ' invisible' : ' visible';

    if (this.state.onEditClick) {
      return (
        <form action="" onSubmit={this.onEditSubmit.bind(this)}
          className="list-group-item to-do-list-item-li ">
          <input
            autoFocus={true}
            className='to-do-list-item-edit'
            type="text"
            value={this.state.title}
            onChange={this.onInputChange.bind(this)}

          />
          <button className='to-do-list-item-edit-submit-button'>
            <i className="fa fa-wrench" aria-hidden="true"></i>
          </button>
        </form>
      );
    }
    
    return (
      <li className={this.state.listItemClass}
        onMouseOver={this.onSpanOver.bind(this)}
        onMouseOut={this.onSpanOver.bind(this)}>
          <div className='to-do-list-item-title' onClick={this.onSelectClick.bind(this)}>
            <span>{this.props.item.title}</span>
          </div>
          <div className='to-do-list-item-edit_delete_icon'>
            <span className={editClass} onClick={this.onEditClick.bind(this)}></span>
            <p className={`${qtyClass} qty`}>{this.props.item.qty}</p>
            <p className={`${qtyClass} qty_done`}>{this.props.item.qty_done}</p>
            <p className={`${qtyClass} qty_not_done`}>{this.props.item.qty_not_done}</p>
            <span className={deleteClass} onClick={this.onDeleteClick.bind(this)}></span>
          </div>
      </li>
    );
  }
}


function mapStateToProps(state) {
  return {
    lists: state.lists,
    Id: state.selectedId
  };
}

export default connect(mapStateToProps, { selectList, deleteList, updateList, selectedId })(ToDoListItem);

import React from 'react';
import { connect } from 'react-redux';
import { selectedId, selectTagList, deleteTag, selectList } from '../../actions/index';

class TagItem extends React.Component {

  onDivClick() {
    this.props.selectList(null);
    this.props.selectedId(null);
    this.props.selectTagList(this.props.tag.id).then( responce => {
      if ( !responce.payload.data.length ) {
        this.props.deleteTag(this.props.tag.id);
      }
    });
  }

  render() {
    return (
      <div
        className='tag-item-name'
        onClick={this.onDivClick.bind(this)}>
        {this.props.tag.name}
      </div>
    );
  }
}




export default connect(null, { selectedId, selectTagList, selectList, deleteTag })(TagItem);

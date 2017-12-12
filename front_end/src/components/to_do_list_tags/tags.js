import React from 'react';
import { connect } from 'react-redux';
import { fetchTags } from '../../actions/index';
import TagItem from './tags_item';

class Tag extends React.Component {
  componentWillMount() {
    this.props.fetchTags();
  }

  renderTags() {
    if (!this.props.tags.length) {
      return (
        <div className='tag_intro'>
          (in order to add a tag you need to create a task and enter a word with the initial symbol '#')
        </div>);
    }
    return this.props.tags.map( tag => {
      return <TagItem tag={tag} key={tag.id}/>;
    });
  }

  render () {
    return (
      <div className='tags'>
        #HASHTAGS
        <br />
        {this.renderTags()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags
  };
}
export default connect(mapStateToProps, { fetchTags })(Tag);

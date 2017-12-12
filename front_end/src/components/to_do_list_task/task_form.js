import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { addTask, addTag, updateTag } from '../../actions/index';

class TaskForm extends React.Component{

  onFormSubmit({title, time}) {

    let newtags = [];
    let updatetags = [];
    const names = this.props.tags.map( tag => tag.name );
    title.split(" ").map( word => {
      if (word[0] === '#' && !names.includes(word)) {
        newtags.push(word);
      } else if ( word[0] === '#' ) {
        updatetags.push(word);
      }
    });

    this.props.addTask(title, time, this.props.selectedId)
      .then( responce => {
        if ( newtags.length ) {
          this.props.addTag(newtags, responce.payload.data.id);
        }
        if ( updatetags.length ) {
          updatetags.map( updatetag => {
            const tag_id = this.props.tags.filter( tag => (tag.name == updatetag ))[0].id;
            this.props.updateTag(tag_id, responce.payload.data.id);
          });
        }
      });

    this.props.reset();
  }


  render() {
    const {handleSubmit, reset} = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onFormSubmit.bind(this))}
        autoComplete="off"
        autoFocus="off"
        className='to-do-list-task-form'
        >
        <div className='to-do-list-task-form-div'>
          <Field
            className='to-do-list-task-input'
            name="title"
            type="text"
            component={renderField}
          />
          <Field
            className='to-do-list-task-time'
            name="time"
            type="datetime-local"
            component={renderField}
          />
          <button className='to-do-list-task-button'>
            <i className="fa fa-chevron-circle-down fa-lg" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    );
  }
}

class renderField extends React.Component {

  render() {
    const {
      input, type, className,
      meta: { error, warning, submitFailed, active }
    } = this.props;
    return (
          <div
            className={`${className}
            ${(submitFailed || active) && error ? "has-danger" : '' }
            ${(submitFailed || active) && warning ? "has-warning" : ''}`}>

            <input {...input} type={type} />
            {
              (submitFailed || active) &&
              ((error && <span className="text-danger">{error}</span>) ||
              (warning && <span className="text-warning">{warning}</span>))
            }
          </div>
    );
  }
}

const validate = values => {
  const validation = {};
  if(!values.title){
    validation.title = 'You must enter a title';
  }
  if(values.time) {
    var time = new Date(values.time);
    if (time - new Date() < 0) {
      validation.time = 'It must be in future';
    }
  }

  return validation;
};

const warn = values => {
  const warnings = {};

   if ( values.title && values.title.length < 4 ) {
    warnings.title = 'It would be better if your task would be longer';
   }
  return warnings;
};

function mapStateToProps(state) {
  return {
    selectedId: state.selectedId,
    tags: state.tags
  };
}
TaskForm = reduxForm({
  form: 'PostNewTask',
  validate,
  warn,
})(TaskForm);

export default connect(
  mapStateToProps,
  { addTask, addTag, updateTag })(TaskForm);

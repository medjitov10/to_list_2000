import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addList, selectList, fetchLists } from '../../actions/index';
import ToDoListItem from './to_do_list_item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Field, reduxForm } from 'redux-form';


class ToDoList extends React.Component {

  componentWillMount() {
    this.props.fetchLists();
  }

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }


  renderItem() {
    return this.props.lists.map( item => {
      return <ToDoListItem item={item} key={item.id}/>;
    });
  }

  onInputChange(event) {
    this.setState({value: event.target.value});
  }

  addNewList({title}) {
    this.props.addList({title: title});
    this.props.reset();
  }


  render() {

    const { handleSubmit, reset} = this.props;
    return (
      <div>
        <form
          onSubmit={handleSubmit(this.addNewList.bind(this))}
          autoComplete="off"
          autoFocus="off"
          >
          <Field
            name="title"
            type="text"
            component={renderField}
            placeholder="Add new list"
            reset={reset}
          />
        </form>
        <ul className="list-group">
          <ReactCSSTransitionGroup
            transitionName="list"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              this.renderItem()
            }
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

const renderField = ({
  input,
  placeholder,
  type,
  reset,
  meta: { error, warning, active, submitFailed }
}) => (
    <div
      className={`form-group to-do-list-input
      ${(active || submitFailed) && error ? "has-danger" : '' }
      ${(active || submitFailed) && warning ? "has-warning" : ''}`}
      >
      <input {...input} type={type} placeholder={placeholder}
      />
      
      <button>
        <i className="fa fa-plus-square fa-lg" aria-hidden="true"></i>
      </button>
      {
      (active || submitFailed) &&
      ((error && <span className="text-danger">{error}</span>) ||
      (warning && <span className="text-warning">{warning}</span>))
      }
    </div>
);

const validate = values => {
  const validation = {};
  if(!values.title){
    validation.title = 'You must enter a title';
  }
  return validation;
};

const warn = values => {
  const warnings = {};
   if ( values.title && values.title.length < 4 ) {
    warnings.title = "It's looks kinda short, but it's alright";
   }
  return warnings;
};

ToDoList = reduxForm({
  form: 'PostNewList',
  validate,
  warn,
})(ToDoList);

function mapStateToProps(state) {
  return {
    lists: state.lists
  };
}

export default connect(mapStateToProps, { addList, selectList, fetchLists })(ToDoList);

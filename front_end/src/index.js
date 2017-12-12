
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';


import Footer from './components/footer/index.js';
import ToDoList from './components/to_do_list/to_do_list';
import SelectedList from './components/to_do_list_task/selected_list';
import Tag from './components/to_do_list_tags/tags';
import reducers from './reducers/reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main_content_classes: 'main-content',
      side_bar_classes: 'side-bar',
      side_bar_button_classes: 'side-bar-button',
      active: true
    };
  }
  sidebar() {
    if (this.state.active) {
      this.setState({
        main_content_classes: 'main-content-inactive',
        side_bar_classes: 'side-bar-inactive',
        side_bar_button_classes: 'side-bar-button-inactive',
        active: !this.state.active
      });
    } else {
      this.setState({
        main_content_classes: 'main-content ',
        side_bar_classes: 'side-bar',
        side_bar_button_classes: 'side-bar-button',
        active: !this.state.active
      });
    }
  }

  render() {

    return (

      <div className='app'>
          <button
            className={this.state.side_bar_button_classes}
            onClick={this.sidebar.bind(this)}>
              <i className="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
          </button>

          <div className={this.state.side_bar_classes}>
            <ToDoList />
            <Tag />
          </div>
          <div className={this.state.main_content_classes} >
            <SelectedList />
          </div>
          <div className='footer'>
            <Footer />
          </div>

      </div>
    );
  }
}




document.addEventListener('DOMContentLoaded', () => {

  const root = document.getElementById('content');
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <App />
    </Provider>, root);
});

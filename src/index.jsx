import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that I need to bundle `./index.scss`;
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className='my-flix'>
      </div>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
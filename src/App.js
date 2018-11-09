import React, { Component } from 'react';
//import './App.css';
import IdeasContainer from './components/IdeasContainer';
import NavBar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <NavBar />
        </div>
        <IdeasContainer />
      </div>
    );
  }
}

export default App;

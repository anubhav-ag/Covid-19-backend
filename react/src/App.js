
import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import VaccineAppt from './components/VaccineAppt';

class App extends Component {
  render() {
    return (
      <div>
          <VaccineAppt />
      </div>
    );
  }
}
export default App;
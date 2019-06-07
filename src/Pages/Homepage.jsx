import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
  render() {
    return (
      <div>


        <div className="wrapper">
          <h1>TrackMap</h1>
          <ul className="listCircuits">
            <li><Link to="/spa">Spa Franchorchamps</Link></li>
            <li>Catalunya</li>
          </ul>
          <p><Link to="/fb">Firebase test</Link></p>
          <h2>About this tool</h2>
          <p>Blah</p>
        </div>
      </div>
    );
  }
}

export default Homepage;

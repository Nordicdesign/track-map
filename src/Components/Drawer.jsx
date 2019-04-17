import React, { Component } from 'react';

class Drawer extends Component {

  render() {

    var visibility = "hide";

    if (this.props.isOpen) {
      visibility = "show";
    }

    return (

      <div id="drawer" className={visibility}>
        <button onClick={this.props.onClick}>Close</button>
        <h2>Turn {this.props.corner}</h2>

        <p>Entry</p>
        <ul data-area="entry">
          <li id="entry-under">
            <button type="button" value="under"
              className={(this.props.corner === 'understeer') ? "selected" : null}
            >
              <strong>UNDER</strong>steer
            </button>
          </li>
          <li id="entry-over">
            <button
              type="button"
              value="over"
              className={this.props.selected ? "selected" : null}
            >
              <strong>OVER</strong>steer
            </button>
          </li>
        </ul>

        <p>Mid corner</p>

        <p>Exit</p>
        <ul data-area="exit">
          <li id="exit-under">
            <button
              type="button"
              value="under"
            >
              <strong>UNDER</strong>steer</button>
          </li>
          <li id="exit-over">
            <button
              type="button"
              value="over"
            >
              <strong>OVER</strong>steer</button>
          </li>
        </ul>

        <h3>Breaking reference point</h3>
        <input type="textarea" value="" name="breakingPoint" id="breakingPoint"/>
        <p>Upload image</p>
      </div>
    );

  }
}

export default Drawer;

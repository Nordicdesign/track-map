import React, { Component } from 'react';
import CornerArea from '../Components/CornerArea';

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

        <CornerArea area="Entry" />
        <CornerArea area="Mid-corner" />
        <CornerArea area="Exit" />



        <h3>Breaking reference point</h3>
        <input type="textarea" value="" name="breakingPoint" id="breakingPoint"/>
        <p>Upload image</p>
      </div>
    );

  }
}

export default Drawer;

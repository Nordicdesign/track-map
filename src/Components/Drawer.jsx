import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// const styles = {
//   list: {
//     width: 550,
//   },
// };



class Drawer extends Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
      corner: this.props.corner,
      // isOpen : false,
    }


    // this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  // componentWillReceiveProps() {
  //   this.setState({
  //     isOpen: this.props.isOpen,
  //   })
  // }


// componentWillMount() {
//
//       console.log(this.props.isOpen);
//             console.log(this.state.isOpen);
// }

// componentWillUpdate(newProps) {
//       console.log(this.props.isOpen);
//             console.log(newProps.isOpen);
//             console.log(this.state.isOpen);
//             //this.setState({isOpen : newProps.isOpen})
//
// }
  render() {

    var visibility = "hide";

    if (this.props.isOpen) {
      visibility = "show";
    }

    return (

      <div id="drawer" className={visibility}>
        <button onClick={this.props.onClick}>Close</button>
        <h2>Turn {this.state.corner}</h2>

        <p>Entry</p>
        <ul data-area="entry">
          <li id="entry-under">
            <button type="button" value="under"
              className={(this.state.corner === 'understeer') ? "selected" : null}
            >
              <strong>UNDER</strong>steer
            </button>
          </li>
          <li id="entry-over">
            <button
              type="button"
              value="over"
              className={this.state.selected ? "selected" : null}
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

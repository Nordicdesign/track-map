import React, { Component } from 'react';

class CornerArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      behaviour: null,
    };
  }

  selectOption = (option) => () => {
    this.setState({
      behaviour: (option === 'under' ? 'understeer' : 'oversteer'),
    });
  };




  render() {

    return (
      <div>
        <p>{this.props.area}</p>
        <ul data-area={this.props.area}>
          <li id={this.props.area + "-under"}>
            <button
              type="button"
              value="under"
              className={(this.state.behaviour === 'understeer') ? "selected" : null}
              onClick={this.selectOption('under')}
            >
              <strong>UNDER</strong>steer
            </button>
          </li>
          <li id={this.props.area + "-over"}>
            <button
              type="button"
              value="over"
              className={this.state.behaviour === 'oversteer' ? "selected" : null}
              onClick={this.selectOption('over')}
            >
              <strong>OVER</strong>steer
            </button>
          </li>
        </ul>
      </div>
    )

  }
}


export default CornerArea;

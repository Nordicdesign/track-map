import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import ListItem from '@material-ui/core/ListItem';

class Toggle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected1: false,
      selected2: false,
    };
  }

  selectOption = (option) => () => {
    this.setState({
      selected1: false,
      selected2: false,
    });
    this.setState({
      [option]: true
    })
  };

  // add something about storing the information of what button was clicked, maybe as a json? Maybe it needs an endpoint

  render() {

    return (
      <div className="toggle">
        <ul>
          <li>
            <button
              className={ this.state.selected1 ? "active" : null }
              onClick={this.selectOption("selected1")}
              label="something"
            >
              {this.props.label1}
            </button>
          </li>
          <li>
            <button
              className={ this.state.selected2 ? "active" : null }
              onClick={this.selectOption("selected2")}
              label="something"
            >
              {this.props.label2}
            </button>
          </li>
        </ul>
      </div>
    )

  }
}


export default Toggle;

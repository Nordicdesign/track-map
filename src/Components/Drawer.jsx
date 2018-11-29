import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';

const styles = {
  list: {
    width: 550,
  },
};


class Spa extends Component {

  state = {
    // top: false,
    // left: false,
    // bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <p>Content</p>
        <Divider />
      </div>
    );
    return (
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
            <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('right', false)}
                onKeyDown={this.toggleDrawer('right', false)}
                className="drawer"
              >
                {sideList}
              </div>
            </Drawer>
          <div className="track">
            <img src="/images/Spa-Francorchamps_of_Belgium.svg" usemap="#image-map" alt="Map of Spa Francorchamps circuit" />
            <map name="image-map">
              <area target="" alt="2" title="2" href="" coords="65,571,40" shape="circle" />
              <area target="" alt="1" title="1" href="" coords="292,803,36" shape="circle" />
              <area target="" alt="3" title="3" href="" coords="181,366,32" shape="circle"/>
              <area target="" alt="4" title="4" href="" coords="218,297,34" shape="circle"/>
              <area target="" alt="5" title="5" href="" coords="313,264,34" shape="circle"/>
              <area target="" alt="6" title="6" href="" coords="545,173,36" shape="circle"/>
              <area target="" alt="7" title="7" href="" coords="1076,68,33" shape="circle"/>
              <area target="" alt="8" title="8" href="" coords="1140,101,35" shape="circle"/>
              <area target="" alt="9" title="9" href="" coords="1224,76,36" shape="circle"/>
              <area target="" alt="10" title="10" href="" coords="1389,116,37" shape="circle"/>
              <area target="" alt="11" title="11" href="" coords="1247,200,39" shape="circle"/>
              <area target="" alt="12" title="12" href="" coords="853,348,36" shape="circle"/>
              <area target="" alt="13" title="13" href="" coords="1245,515,37" shape="circle"/>
              <area target="" alt="14" title="14" href="" coords="1162,625,39" shape="circle"/>
              <area target="" alt="15" title="15" href="" coords="1353,676,35" shape="circle"/>
              <area target="" alt="16" title="16" href="" coords="1257,820,38" shape="circle"/>
              <area target="" alt="17" title="17" href="" coords="956,561,37" shape="circle"/>
              <area target="" alt="18" title="18" href="" coords="710,473,36" shape="circle"/>
              <area target="" alt="19" title="19" href="" coords="346,678,38" shape="circle"/>
              <area target="" alt="20" title="20" href="" coords="385,538,40" shape="circle"/>
            </map>

          </div>

      </div>
    )

  }
}

Spa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spa);

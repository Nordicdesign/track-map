import React, {Component} from 'react';
import Drawer from '../Components/Drawer';

class Spa extends Component {

  constructor(props,context) {
    super(props,context);

    this.state = {
      isOpen: false,
      corner: null
    };
    
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (corner) => () => {
    this.setState({
      isOpen: !this.state.isOpen,
      corner: corner,
    });
  };

  // setSelected = (corner, type, behaviour) => () => {
  //   // corner: numeric
  //   // type: entry, mid, exit
  //   // behaviour: oversteer, understeer
  //   this.setState({
  //     behaviour: {
  //       [corner]: {
  //         [type]: behaviour
  //       }
  //     }
  //
  //   });
  //   console.log(this.state.behaviour);
  // };

  render() {
    return (<div>
      <h1>Spa Franchorchamps</h1>
      <button onClick={this.toggleDrawer(1)}>Open turn 1</button>

      <div className="track">
        <img src="/images/Spa-Francorchamps_of_Belgium.svg" useMap="#image-map" alt="Map of Spa Francorchamps circuit"/>
        <map name="image-map">
          <area target="" alt="2" title="2" href="" coords="65,571,40" shape="circle"/>
          <area target="" alt="1" title="1" href="" coords="292,803,36" shape="circle"/>
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
      <Drawer
        isOpen={this.state.isOpen}
        onClick={this.toggleDrawer(this.state.corner)}
        corner={this.state.corner}
      />
    </div>)

  }
}

export default Spa;

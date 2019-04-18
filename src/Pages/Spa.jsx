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
        <img id="imageMap" src="/images/Spa-Francorchamps_of_Belgium.svg" useMap="#image-map" alt="Map of Spa Francorchamps circuit"/>
        <map name="image-map">
          <area target="" alt="2" title="2" href="#" coords="43,379,27" shape="circle" onClick={this.toggleDrawer(2)} />
          <area target="" alt="1" title="1" href="#" coords="194,533,24" shape="circle" onClick={this.toggleDrawer(1)} />
          <area target="" alt="3" title="3" href="#" coords="120,243,21" shape="circle" onClick={this.toggleDrawer(3)} />
          <area target="" alt="4" title="4" href="#" coords="145,197,23" shape="circle" onClick={this.toggleDrawer(4)} />
          <area target="" alt="5" title="5" href="#" coords="208,175,23" shape="circle" onClick={this.toggleDrawer(5)} />
          <area target="" alt="6" title="6" href="#" coords="362,115,24" shape="circle" onClick={this.toggleDrawer(6)} />
          <area target="" alt="7" title="7" href="#" coords="714,45,22" shape="circle" onClick={this.toggleDrawer(7)} />
          <area target="" alt="8" title="8" href="#" coords="757,67,23" shape="circle" onClick={this.toggleDrawer(8)} />
          <area target="" alt="9" title="9" href="#" coords="813,50,24" shape="circle" onClick={this.toggleDrawer(9)} />
          <area target="" alt="10" title="10" href="#" coords="922,77,25" shape="circle" onClick={this.toggleDrawer(10)} />
          <area target="" alt="11" title="11" href="#" coords="828,133,26" shape="circle" onClick={this.toggleDrawer(11)} />
          <area target="" alt="12" title="12" href="#" coords="566,231,24" shape="circle" onClick={this.toggleDrawer(12)} />
          <area target="" alt="13" title="13" href="#" coords="826,342,25" shape="circle" onClick={this.toggleDrawer(13)} />
          <area target="" alt="14" title="14" href="#" coords="771,415,26" shape="circle" onClick={this.toggleDrawer(14)} />
          <area target="" alt="15" title="15" href="#" coords="898,449,23" shape="circle" onClick={this.toggleDrawer(15)} />
          <area target="" alt="16" title="16" href="#" coords="834,544,25" shape="circle" onClick={this.toggleDrawer(16)} />
          <area target="" alt="17" title="17" href="#" coords="635,372,25" shape="circle" onClick={this.toggleDrawer(17)} />
          <area target="" alt="18" title="18" href="#" coords="471,314,24" shape="circle" onClick={this.toggleDrawer(18)} />
          <area target="" alt="19" title="19" href="#" coords="230,450,25" shape="circle" onClick={this.toggleDrawer(19)} />
          <area target="" alt="20" title="20" href="#" coords="256,357,27" shape="circle"  onClick={this.toggleDrawer(20)} />
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

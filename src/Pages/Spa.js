import React from 'react'

import Track from '../Components/Track'
const trackName = "Spa-Francorchamps";
const trackID= "spa";
const URL = "/images/Spa-Francorchamps_of_Belgium.svg";

const Spa = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Spa

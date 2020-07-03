import React from 'react'

import Track from '../Components/Track'
const trackName = "Mount Panorama - Bathurst";
const trackID= "bathurst";
const URL = "/images/Mount_Panorama.png";

const Bathurst = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Bathurst

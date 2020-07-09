import React from 'react'

import Track from '../Components/Track'
const trackName = "Circuit Zolder";
const trackID= "zolder";
const URL = "/images/Zolder.svg";

const Zolder = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Zolder

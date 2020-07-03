import React from 'react'

import Track from '../Components/Track'
const trackName = "Sebring";
const trackID= "sebring";
const URL = "/images/Sebring_International_Raceway.svg";

const Sebring = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Sebring

import React from 'react'

import Track from '../Components/Track'
const trackName = "Circuit de la Sarthe";
const trackID= "lemans";
const URL = "/images/la-sarthe-horizontal.svg";

const LaSarthe = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default LaSarthe

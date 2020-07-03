import React from 'react'

import Track from '../Components/Track'
const trackName = "Daytona";
const trackID= "daytona";
const URL = "/images/Daytona_International_Speedway_-_Road_Course.svg__81933_original.webp";

const Daytona = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Daytona

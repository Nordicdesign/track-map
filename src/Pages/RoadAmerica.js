import React from 'react'

import Track from '../Components/Track'
const trackName = "Road America";
const trackID= "road-america";
const URL = "/images/Road_America.svg";

const RoadAmerica = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default RoadAmerica

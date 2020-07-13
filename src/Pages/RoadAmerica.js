import React from 'react'

import Track from '../Components/Track'
const trackName = "Road America";
const trackID= "road-america";
const URL = "/images/Road_America.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const RoadAmerica = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
      imgAuthor={imgAuthor}
      imgCC={imgCC}
    />
  )
}

export default RoadAmerica

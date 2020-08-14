import React from 'react'

import Track from '../Components/Track'
const trackName = "Road Atlanta";
const trackID= "road-atlanta";
const URL = "/images/Road_Atlanta_track_map.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const RoadAtlanta = () => {
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

export default RoadAtlanta

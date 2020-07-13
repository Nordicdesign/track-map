import React from 'react'

import Track from '../Components/Track'
const trackName = "Daytona";
const trackID= "daytona";
const URL = "/images/Daytona_International_Speedway_-_Road_Course.svg__81933_original.webp";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Daytona = () => {
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

export default Daytona

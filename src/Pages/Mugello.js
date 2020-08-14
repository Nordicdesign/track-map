import React from 'react'

import Track from '../Components/Track'
const trackName = "Mugello";
const trackID= "mugello";
const URL = "/images/Mugello_Racing_Circuit_track_map.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Mugello = () => {
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

export default Mugello

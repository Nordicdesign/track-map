import React from 'react'

import Track from '../Components/Track'
const trackName = "Watkins Glen";
const trackID= "watkins-glen";
const URL = "/images/Watkins_Glen_International_Track_Map.svg";
const imgAuthor = "Xander89"
const imgCC = "https://commons.wikimedia.org/wiki/User:Xander89"

const Watkins = () => {
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

export default Watkins

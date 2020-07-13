import React from 'react'

import Track from '../Components/Track'
const trackName = "Mount Panorama - Bathurst";
const trackID= "bathurst";
const URL = "/images/Mount_Panorama.png";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Bathurst = () => {
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

export default Bathurst

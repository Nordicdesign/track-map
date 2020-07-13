import React from 'react'

import Track from '../Components/Track'
const trackName = "Spa-Francorchamps";
const trackID= "spa";
const URL = "/images/Spa-Francorchamps_of_Belgium.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Spa = () => {
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

export default Spa

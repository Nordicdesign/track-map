import React from 'react'

import Track from '../Components/Track'
const trackName = "Suzuka";
const trackID= "suzuka";
const URL = "/images/Suzuka_circuit_map--2005.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Suzuka = () => {
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

export default Suzuka

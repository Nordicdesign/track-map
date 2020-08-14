import React from 'react'

import Track from '../Components/Track'
const trackName = "Canadian Tire Motorsport Park";
const trackID= "mosport";
const URL = "/images/Mosport-CTMP.svg";
const imgAuthor = "Apex-Ash"
const imgCC = "https://en.wikipedia.org/wiki/Canadian_Tire_Motorsport_Park#/media/File:Mosport-CTMP.svg"

const Mosport = () => {
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

export default Mosport

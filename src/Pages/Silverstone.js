import React from 'react'

import Track from '../Components/Track'
const trackName = "Silverstone";
const trackID= "silverstone";
const URL = "/images/Silverstone_Circuit_2011.png";
const imgAuthor = "Tom McKay"
const imgCC = "https://commons.wikimedia.org/wiki/File:Silverstone_Circuit_2011.png"

const Silverstone = () => {
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

export default Silverstone

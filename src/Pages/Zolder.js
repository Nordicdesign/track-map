import React from 'react'

import Track from '../Components/Track'
const trackName = "Circuit Zolder";
const trackID= "zolder";
const URL = "/images/Zolder.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Zolder = () => {
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

export default Zolder

import React from 'react'

import Track from '../Components/Track'
const trackName = "Zandvoort";
const trackID= "zandvoort";
const URL = "/images/Zandvoort.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Zandvoort = () => {
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

export default Zandvoort

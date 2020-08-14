import React from 'react'

import Track from '../Components/Track'
const trackName = "Vallelunga";
const trackID= "vallelunga";
const URL = "/images/Track_map_for_Vallelunga--2003_version.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Vallelunga = () => {
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

export default Vallelunga

import React from 'react'

import Track from '../Components/Track'
const trackName = "Sebring";
const trackID= "sebring";
const URL = "/images/Sebring_International_Raceway.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Sebring = () => {
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

export default Sebring

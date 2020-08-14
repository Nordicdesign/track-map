import React from 'react'

import Track from '../Components/Track'
const trackName = "Nurburgring - GP";
const trackID= "nurburgring";
const URL = "/images/Nurburgring_-_Grand-Prix-Strecke.svg";
const imgAuthor = "Will Pittenger"
const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Nurburgring = () => {
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

export default Nurburgring

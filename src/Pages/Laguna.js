import React from 'react'

import Track from '../Components/Track'
const trackName = "Laguna Seca";
const trackID= "laguna-seca";
const URL = "/images/laguna-seca.png";
// const imgAuthor = ""
// const imgCC = "https://commons.wikimedia.org/wiki/User:Will_Pittenger"

const Laguna = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Laguna

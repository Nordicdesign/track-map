import React from 'react'

import Track from '../Components/Track'
const trackName = "Shanghai International Circuit";
const trackID= "shanghai";
const URL = "/images/Circuit_Shanghai_2004.svg";
const imgCC = "https://commons.wikimedia.org/wiki/User:AlexJ"
const imgAuthor = "AlexJ"


const Shanghai = () => {
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

export default Shanghai

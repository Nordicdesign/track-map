import React from 'react'

import Track from '../Components/Track'
const trackName = "Circuit de Catalunya";
const trackID= "barcelona";
const URL = "/images/1000px-Circuit_Catalunya_2007.svg.png";
const imgCC = "https://commons.wikimedia.org/wiki/User:AlexJ"
const imgAuthor = "AlexJ"

const Barcelona = () => {
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

export default Barcelona

import React from 'react'

import Track from '../Components/Track'
const trackName = "Shanghai International Circuit";
const trackID= "shanghai";
const URL = "/images/Circuit_Shanghai_2004.svg";

const Shanghai = () => {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
    />
  )
}

export default Shanghai

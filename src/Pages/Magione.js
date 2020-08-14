import React from 'react'

import Track from '../Components/Track'
const trackName = "Autodromo di Magione";
const trackID= "magione";
const URL = "/images/Autodromo_di_Magione.svg";
const imgAuthor = "Francesco Betti Sorbelli"
const imgCC = "https://it.wikipedia.org/wiki/Utente:Francesco_Betti_Sorbelli"

const Magione = () => {
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

export default Magione

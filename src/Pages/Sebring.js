import React from 'react'
import Track from '../Components/Track'

const numberTurns = 17 + 1; // Add the number of actual turns, but we need an extra one for the zero
const imgWidth = 1580;
const canvasMargin = 500;
const trackName= "Sebring";
const trackID= "4";
const URL = "/images/Sebring_International_Raceway.svg";
const MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [551,20,15], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [607,119,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [560,74,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [492,129,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [676,174,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [767,285,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [558,239,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [500,370,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [382,292,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [345,368,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [557,477,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [606,457,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "13", shape: "circle", coords: [633,575,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [23,250,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [68,182,15], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [196,261,15], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

export default function Sebring() {
  return (
    <Track
      trackName={trackName}
      trackID={trackID}
      URL={URL}
      MAP={MAP}
      numberTurns={numberTurns}
      canvasMargin={canvasMargin}
      imgWidth={imgWidth}
    />
  )
};

import React from 'react'
import Track from '../Components/Track'

const numberTurns = 17 + 1; // Add the number of actual turns, but we need an extra one for the zero
const imgWidth = 990;
const canvasMargin = 500;
const trackName= "Sebring";
const trackID= "4";
const URL = "/images/Sebring_International_Raceway.svg";
const MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [745,549,22], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [723,357,21], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [724,267,21], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [706,198,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [628,230,21], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [490,313,22], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [26,367,21], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [154,184,22], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [296,136,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [477,51,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [601,41,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [714,72,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "13", shape: "circle", coords: [795,74,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [868,371,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [929,580,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [881,717,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [65,688,24], fillColor: "rgba(0, 0, 0, 0.25)" },
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

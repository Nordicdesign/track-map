import React from 'react'
import Track from '../Components/Track'

const numberTurns = 20 + 1; // Add the number of actual turns, but we need an extra one for the zero
const imgWidth = 940;
const canvasMargin = 500;
const trackName= "Spa Francorchamps";
const trackID= "0";
const URL = "/images/Spa-Francorchamps_of_Belgium.svg";
const MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [194,533,24], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [43,379,27], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [120,243,21], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [145,197,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [208,175,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [362,115,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [714,45,22], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [757,67,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [813,50,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [922,77,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [828,133,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [566,231,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "13", shape: "circle", coords: [826,342,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [771,415,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [898,449,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [834,544,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "17", shape: "circle", coords: [635,372,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "18", shape: "circle", coords: [471,314,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "19", shape: "circle", coords: [230,450,25], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "20", shape: "circle", coords: [256,357,27], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

export default function Spa() {
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

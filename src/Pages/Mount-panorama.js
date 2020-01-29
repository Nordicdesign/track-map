import React from 'react'
import Track from '../Components/Track'

const numberTurns = 23 + 1; // Add the number of actual turns, but we need an extra one for the zero
const imgWidth = 1495;
const canvasMargin = 500;
const trackName= "Mount Panorama";
const trackID= "1938";
const URL = "/images/Mount_Panorama.png";
const MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [90,692,24], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [797,540,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [849,741,22], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [862,825,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [930,753,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [1026,737,24], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [1117,706,26], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [1193,733,22], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [1265,712,23], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [1319,588,30], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [1348,412,32], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [1257,380,32], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "13", shape: "circle", coords: [1336,325,32], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [1262,281,31], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [1350,250,30], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [1284,187,31], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "17", shape: "circle", coords: [1364,141,32], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "18", shape: "circle", coords: [1398,32,31], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "19", shape: "circle", coords: [1249,83,31], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "20", shape: "circle", coords: [492,173,30], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "21", shape: "circle", coords: [361,248,32], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "22", shape: "circle", coords: [262,230,31], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "23", shape: "circle", coords: [40,287,31], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

export default function Bathurst() {
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

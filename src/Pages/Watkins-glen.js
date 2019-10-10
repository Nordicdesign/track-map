import React from 'react'
import Track from '../Components/Track'

const numberTurns = 11 + 1; // Add the number of actual turns, but we need an extra one for the zero
const imgWidth = 999;
const canvasMargin = 500;
const trackName= "Watkins Glen";
const trackID= "3";
const URL = "/images/Watkins_Glen_International_Track_Map.svg";
const MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [113,342,35], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [56,180,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [182,147,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [304,35,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [911,71,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [823,285,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [963,362,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [557,440,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [594,274,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [493,297,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [434,466,35], fillColor: "rgba(0, 0, 0, 0.25)" },
    // { name: "Bus entry", shape: "rect", coords: [655,59,724,104], fillColor: "rgba(0, 0, 0, 0.25)" },
    // { name: "Bus exit", shape: "rect", coords: [737,49,807,106], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

export default function Watkins() {
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

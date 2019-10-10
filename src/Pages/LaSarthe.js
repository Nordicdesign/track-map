import React from 'react'
import Track from '../Components/Track'

const numberTurns = 26 + 1; // Add the number of actual turns, but we need an extra one for the zero
const imgWidth = 1580;
const canvasMargin = 460;
const trackName = "Circuit de La Sarthe";
const trackID = "1";
const URL = "/images/la-sarthe-horizontal.svg";
const MAP = {
  name: "my-map",
  areas: [
    { name: "1", shape: "circle", coords: [142,450,20], fillColor: "rgba(0, 0, 0, 0.25)"  },
    { name: "2", shape: "circle", coords: [150,348,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "3", shape: "circle", coords: [92,372,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "4", shape: "circle", coords: [56,286,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "5", shape: "circle", coords: [208,175,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "6", shape: "circle", coords: [109,209,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "7", shape: "circle", coords: [34,214,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "8", shape: "circle", coords: [20,93,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "9", shape: "circle", coords: [591,28,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "10", shape: "circle", coords: [608,99,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "11", shape: "circle", coords: [650,25,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "12", shape: "circle", coords: [1105,87,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "13", shape: "circle", coords: [1125,20,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "14", shape: "circle", coords: [1159,89,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "15", shape: "circle", coords: [1508,112,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "16", shape: "circle", coords: [1563,155,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "17", shape: "circle", coords: [1207,540,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "18", shape: "circle", coords: [1117,498,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "19", shape: "circle", coords: [1158,622,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "20", shape: "circle", coords: [777,646,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "21", shape: "circle", coords: [759,551,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "22", shape: "circle", coords: [688,528,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "23", shape: "circle", coords: [628,596,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "24", shape: "circle", coords: [611,500,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "25", shape: "circle", coords: [384,471,20], fillColor: "rgba(0, 0, 0, 0.25)" },
    { name: "26", shape: "circle", coords: [344,533,20], fillColor: "rgba(0, 0, 0, 0.25)" },
  ]
}

export default function LaSarthe() {
  // const trackTurns = [
  //   "",
  //   "Dunlop curve",
  //   "Dunlop chicane 1",
  //   "Dunlop chicane 2",
  //   "Esses",
  //   "",
  //   "",
  //   "",
  //   "Tertre Rougue",
  //   "1st chicane",
  //   "",
  //   "",
  //   "2nd chicane",
  //   "",
  //   "",
  //   "",
  //   "Mulsanne",
  //   "",
  //   "Indianapolis",
  //   "Arnage",
  //   "Porsche curve 1",
  //   "Porsche curve 2",
  //   "Porsche curve 2",
  //   "Esses du Karting",
  //   "Corvette curve",
  //   "Ford curves"
  // ]
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

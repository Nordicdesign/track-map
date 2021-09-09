import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import tracks from '../constants/tracks.json'

import Track from '../Components/Track'

const NoTrack = () => {
  return (
    <div>
      <h1>can't find that track</h1>
      <p>Try again please</p>
    </div>
  )
}

const TrackHolder = () => {
  // type TrackParam = { trackName: string }
  // const { trackName } = useParams<TrackParam>();
  console.log("all tracks", tracks);
  const [trackExists, setTrackExists] = useState(false)
  const { trackName } = useParams();
  console.log("trackName", trackName);
  console.log("does it have it?", tracks.hasOwnProperty(trackName));

  useEffect(() => {
    if (tracks.hasOwnProperty(trackName)) (setTrackExists(true));
    return () => null;
  }, [])


  // const { name, url, imgAuthor, imgCC } = tracks[trackName];

  return (
    trackExists ? (
      <Track
      trackName={tracks[trackName].name}
      trackID={trackName}
      URL={tracks[trackName].url}
      imgAuthor={tracks[trackName].imgAuthor}
      imgCC={tracks[trackName].imgCC}
    />
  ) : <NoTrack/>
  )
}

export default TrackHolder

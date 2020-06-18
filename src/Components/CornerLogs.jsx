import React from 'react';

export default function CornerLogs({data, turn, registerNotes}) {

  // increase index in 1 so it matches the track corner number
  let turnID = turn;
  turnID = turnID++;

  return (
    <div className="track-logs">
      <div className="turn-number">
        <p>T{turn}</p>
      </div>

      <div className="track-turn-notes">
        <label>
          <textarea
            name={turn}
            id={turn}
            placeholder="Write something"
            value={data.notes ? data.notes : ""}
            onChange={(e) => registerNotes(e, turnID)}
           />
        </label>
      </div>
      <div>
        <p>Expand</p>
      </div>
    </div>
  )
}

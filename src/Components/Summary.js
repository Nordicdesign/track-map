import React from 'react';

function Summary(props) {
  return (
    <div className="summary">
      <h2>Summary</h2>
      <ul>
        {props.notes.map((turn, index) => {
          return turn.notes && <li key={index}>T{index} - {turn.notes}</li>
        })}
      </ul>
    </div>
  )
}

export default Summary;

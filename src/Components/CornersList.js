import React from 'react';

export function CornersList(props) {

  console.log(props);
  return (
    <div key={props.name} className="corner-entry">
      <p>Corner data goes here</p>
    </div>
  )
}

export function NoCorners() {
  return (
    <p>Add some corner data</p>
  )
}

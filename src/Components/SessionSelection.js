import React from 'react';

export default function SessionSelection(props) {
  const data = props.sessions;
  const sessions = [];
  for (const [index,session] of data.entries()) {

    // let date = new Date(session.name)
    // date = date.toUTCString()
    sessions.push(<option key={index} value={session.id}>{session.name}</option>)
  }

  return (
    <div className="session-selection">
      Session
      <select onChange={props.changeSession} value={props.currentSession}>
        {sessions}
      </select>
    </div>
  )
}

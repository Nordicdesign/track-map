import React from 'react';

function SessionSelection(props) {
  const data = props.sessions;
  const sessions = [];
  for (const [index, session] of data.entries()) {
    sessions.push(<option key={index}>{session.name}</option>)
  }

  return (
    <div className="session-selection">
      <select>
        {sessions}
      </select>
    </div>
  )
}

export default SessionSelection;

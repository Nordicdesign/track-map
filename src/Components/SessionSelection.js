import React, { useState } from 'react';


const SessionSelection = (props) => {

  const initialFieldValues = {
    changeName: false,
    newSession: false,
    sessionName: ''
  }

  var [values, setValues] = useState(initialFieldValues)

  const ses = props.sessions;
  const sessions = [];
  for (const [index,session] of ses.entries()) {

    // let date = new Date(session.name)
    // date = date.toUTCString()
    sessions.push(<option key={index} value={session.id}>{session.name}</option>)
  }

  const showChangeName = () => {
    setValues({changeName: true})
  }

  const showNewSession = () => {
    setValues({newSession: true})
  }

  const handleChange = e => {
      var { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    props.renameSession(values.sessionName);
    setValues({changeName: false})
  }

  const handleNewSessionSubmit = e => {
    e.preventDefault()
    props.newSession(values.sessionName);
    setValues({newSession: false})
  }

  return (
    <div>
      {values.changeName ? (
        <div className="new-session">
          <form onSubmit={handleFormSubmit} autoComplete="off" method="post">
            <label>New session name
            <input
              type="text"
              name="sessionName"
              id="sessionName"
              value={values.sessionName}
              onChange={handleChange}
              /></label>
            <input
              type="submit"
              value="Rename"
            />
        </form>
        </div>
      ) : (
        values.newSession ? (
          <div className="new-session">
            <form onSubmit={handleNewSessionSubmit} autoComplete="off" method="post">
              <label>New session name
              <input
                type="text"
                name="sessionName"
                id="sessionName"
                value={values.sessionName}
                onChange={handleChange}
                /></label>
              <input
                type="submit"
                value="Create"
              />
          </form>
          </div>
        ) : (
          <div className="session-selection">
            <label>Session
              <select onChange={props.changeSession} value={props.currentSession}>
                {sessions}
              </select>
            </label>
            <div>
              <button className="button-icon" onClick={showChangeName}><div className="icon icon-pencil-square"></div></button>
              <button className="button-icon" onClick={showNewSession}><div className="icon icon-plus-circle"></div></button>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default SessionSelection

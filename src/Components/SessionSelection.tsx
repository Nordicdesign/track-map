import React, { useState } from 'react'

const SessionSelection = (props: any) => {
  const [changeName, setChangeName] = useState<boolean>(false)
  const [newSession, setNewSession] = useState<boolean>(false)
  const [sessionName, setSessionName] = useState<string>('')

  const ses = props.sessions
  const sessions = []
  for (const [index, session] of ses.entries()) {
    // let date = new Date(session.name)
    // date = date.toUTCString()
    sessions.push(
      <option key={index} value={session.id}>
        {session.name}
      </option>,
    )
  }

  const showChangeName = () => {
    setChangeName(true)
  }

  const showNewSession = () => {
    setNewSession(true)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSessionName(value)
    // setValues({
    //   ...values,
    //   [name]: value,
    // })
  }

  const handleCancelSessions = () => {
    setChangeName(false)
    setNewSession(false)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    props.renameSession(sessionName)
    setNewSession(false)
  }

  const handleNewSessionSubmit = (e: any) => {
    e.preventDefault()
    props.newSession(sessionName)
    setNewSession(false)
  }

  return (
    <div>
      {changeName ? (
        <div className="new-session">
          <form onSubmit={handleFormSubmit} autoComplete="off" method="post">
            <label>
              Rename session
              <input
                type="text"
                name="sessionName"
                id="sessionName"
                value={sessionName}
                onChange={handleChange}
              />
            </label>
            <div>
              <input type="submit" value="Rename" className="button-submit" />
              <p>
                <button
                  className="button-link"
                  onClick={() => handleCancelSessions()}
                >
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      ) : newSession ? (
        <div className="new-session">
          <form
            onSubmit={handleNewSessionSubmit}
            autoComplete="off"
            method="post"
          >
            <label>
              Create new session
              <input
                type="text"
                name="sessionName"
                id="sessionName"
                value={sessionName}
                onChange={handleChange}
              />
            </label>
            <div>
              <input type="submit" value="Create" className="button-submit" />
              <p>
                <button
                  className="button-link"
                  onClick={() => handleCancelSessions()}
                >
                  Cancel
                </button>
              </p>
            </div>
          </form>
          <p className="new-session-p">
            Sessions help you keep your notes organised by cars, or maybe
            different weekends.{' '}
          </p>
        </div>
      ) : (
        <div className="session-selection">
          <label>
            Session
            <select
              onChange={props.changeSession}
              value={props.currentSession ? props.currentSession : ''}
            >
              {sessions}
            </select>
          </label>
          <div>
            <button className="button-icon" onClick={showChangeName}>
              <div className="icon icon-pencil-square"></div>
            </button>
            <button className="button-icon" onClick={showNewSession}>
              <div className="icon icon-plus-circle"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SessionSelection

import React, { useRef, useState } from 'react'

type Props = {
  sessions: any
  currentSession: any
  changeSession: any
  renameSession: any
  newSession: any
}

export const SessionSelection = (props: Props) => {
  // const { sessions, currentSession, changeSession, renameSession, newSession } =
  const { sessions, currentSession, changeSession, renameSession, newSession } =
    props
  // console.log(sessions)
  const inputSessionName = useRef<HTMLInputElement | null>(null)
  const selectSessions = useRef<HTMLSelectElement | null>(
    currentSession ? currentSession : '',
  )
  const [changeName, setChangeName] = useState<boolean>(false)
  const [isNewSession, setisNewSession] = useState<boolean>(false)
  // const [sessionName, setSessionName] = useState<string>('')

  const availableSessions = sessions.map((session: any, index: React.Key) => {
    return (
      <option key={index} value={session.id}>
        {session.name}
      </option>
    )
  })

  const showChangeName = () => setChangeName(true)
  const showNewSession = () => setisNewSession(true)

  const handleCancelSessions = () => {
    setChangeName(false)
    setisNewSession(false)
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    const sessionName = inputSessionName.current?.value

    if (!sessionName) {
      return
    }
    renameSession(sessionName)
    setisNewSession(false)
  }

  const handleNewSessionSubmit = (e: any) => {
    e.preventDefault()
    const sessionName = inputSessionName.current?.value

    if (!sessionName) {
      return
    }
    setisNewSession(false) // hide form
    newSession(sessionName) // load new data
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
                ref={inputSessionName}
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
      ) : isNewSession ? (
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
                ref={inputSessionName}
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
              // onChange={changeSession(selectSessions.current?.value)}
              onChange={() => changeSession(selectSessions.current?.value)}
              ref={selectSessions}
            >
              {availableSessions}
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

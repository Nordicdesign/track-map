import React, { useRef, useState } from 'react'
import { SessionType } from '../../../app/utils/types'

type Props = {
  sessions: SessionType[] | null
  currentSessionId: string | null
  changeSession: (newSessionID: string) => void
  renameSession: any
  newSession: any
}

export const SessionSelection = (props: Props) => {
  const {
    sessions,
    currentSessionId,
    changeSession,
    renameSession,
    newSession,
  } = props

  const inputSessionName = useRef<HTMLInputElement>(null)
  const selectSessions = useRef<HTMLSelectElement>(null)
  const [changeName, setChangeName] = useState<boolean>(false)
  const [isNewSession, setisNewSession] = useState<boolean>(false)

  if (!sessions || !currentSessionId) {
    return null
  }

  const handleChangeSession = () => {
    const selectedSession = selectSessions.current?.value
    if (selectedSession !== undefined) {
      changeSession(selectedSession)
    }
  }

  const availableSessions = sessions.map(
    (session: SessionType, index: React.Key) => {
      return (
        <option key={index} value={session.id}>
          {session.name}
        </option>
      )
    },
  )

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
              onChange={handleChangeSession}
              ref={selectSessions}
              defaultValue={currentSessionId ? currentSessionId : undefined}
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

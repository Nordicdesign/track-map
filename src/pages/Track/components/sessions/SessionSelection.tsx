import { Key, SyntheticEvent, useRef, useState } from 'react'
import { Session } from '../../../../app/utils/types'

type Props = {
  sessions: Session[] | null
  currentSessionId: string | null
  changeSession: (newSessionID: string) => void
  renameSession: (sessionName: string) => void
  newSession: (sessionName: string) => void
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

  const availableSessions = sessions.map((session: Session, index: Key) => {
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

  const handleChangeNameSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const sessionName = inputSessionName.current?.value

    if (!sessionName) {
      return
    }
    renameSession(sessionName)
    setChangeName(false)
  }

  const handleNewSessionSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const sessionName = inputSessionName.current?.value

    if (!sessionName) {
      return
    }
    newSession(sessionName) // load new data
    setisNewSession(false) // hide form
  }

  return (
    <div>
      {changeName ? (
        <div className="new-session">
          <form
            onSubmit={handleChangeNameSubmit}
            autoComplete="off"
            method="post"
          >
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
            different weekends.
          </p>
        </div>
      ) : (
        <div className="session-selection">
          <label htmlFor="session">
            Session
            <div>
              <select
                id="session"
                name="session"
                onChange={handleChangeSession}
                ref={selectSessions}
                defaultValue={currentSessionId ? currentSessionId : undefined}
              >
                {availableSessions}
              </select>
              <button onClick={showChangeName} aria-label="edit">
                edit
                <div className="icon inline icon-pencil-square"></div>
              </button>
            </div>
          </label>
          <div>
            <button
              className="button-icon"
              onClick={showNewSession}
              aria-label="add new session"
            >
              <div className="icon icon-plus-circle"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

// import { loadData } from '../utils/data'

export const SessionCreator = (props: any) => {
  const { trackID, authUser } = props

  const [inputText, setInputText] = useState<string>('')
  const [sent, setSent] = useState<boolean>(false)

  const handleChange = (e: any) => {
    setInputText(e.target.value)
  }

  const createNewSession = (e: any) => {
    const sessionData = {
      name: inputText,
    }
    console.log("let's create a new session!", sessionData)
    e.preventDefault()

    // add them to a new session
    const newSession = firebase
      .database()
      .ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/')
      .push()
    newSession.set({
      sessionData,
    })
    // let newSession = firebase
    //   .database()
    //   .ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/')
    //   .push()
    // newSession.set(sessionData)

    setSent(true)
    // loadData(authUser, trackID)
  }

  const isEnabled = inputText.length > 0

  return (
    <div className="session-creator">
      {!sent ? (
        <form onSubmit={createNewSession}>
          <label>New session</label>
          <input type="text" value={inputText} onChange={handleChange} />
          <input type="submit" disabled={!isEnabled} value="Create" />
        </form>
      ) : (
        <p>Ready to go</p>
      )}
    </div>
  )
}

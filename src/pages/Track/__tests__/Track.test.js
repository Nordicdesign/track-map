import Track from '../Track'
import { MemoryRouter, Routes, Route, Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history'
import { UserContext } from '../../../providers/UserProvider'

// mocking Data.js so it doesn't complain when detaching
jest.mock('../../Utils/Data')

const emptyUser = { user: { userId: null, userEmail: null } }
//
// const renderComponent = (user = emptyUser) => {
//     return render(<UserContext.Provider value={user}><BrowserRouter><Header /></BrowserRouter></UserContext.Provider>);
// }
//

describe('Track page', () => {
  it("shows a 404 not found if the track doesn't exist", (user = emptyUser) => {
    render(
      <UserContext.Provider value={user}>
        <MemoryRouter initialEntries={['/tracks/unknown']}>
          <Route path="/tracks/:trackName">
            <Track />
          </Route>
        </MemoryRouter>
      </UserContext.Provider>,
    )

    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  it('renders the correct track', (user = emptyUser) => {
    const history = createMemoryHistory()
    history.push('/tracks/daytona')

    render(
      <UserContext.Provider value={user}>
        <Router history={history}>
          <Track />
        </Router>
      </UserContext.Provider>,
      // <UserContext.Provider value={user}>
      //   <MemoryRouter initialEntries={["tracks/daytona"]}>
      //     <Route path="/tracks/:trackName">
      //       <Track />
      //     </Route>
      //   </MemoryRouter>
      // </UserContext.Provider>
    )

    expect(
      screen.getByRole('heading', { name: /daytona/i }),
    ).toBeInTheDocument()
  })
})

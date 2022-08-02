import React from 'react'
import { Header } from '../header/Header'
import { BrowserRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
// import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup)

const emptyUser = { user: { userId: null, userEmail: null } }

// const renderComponent = (user = emptyUser) => {
//   return render(
//     <UserContext.Provider value={user}>
//       <BrowserRouter>
//         <Header />
//       </BrowserRouter>
//     </UserContext.Provider>,
//   )
// }

// describe('Header', () => {
//   it('Shows app name on header', () => {
//     const { getByTestId } = renderComponent()
//     expect(getByTestId('header-name').textContent).toBe('TrackMap')
//   })

//   it('Shows initial user as null', () => {
//     const { getByTestId } = renderComponent()
//     expect(getByTestId('login').textContent).toBe('Log in')
//   })

//   it('Shows email once logged in', () => {
//     const { getByTestId } = renderComponent({
//       user: { userId: 'Test User', userEmail: 'test@test.com' },
//     })
//     expect(getByTestId('email').textContent).toContain('test@test.com')
//   })

//   it('Shows a button to log out', () => {
//     const { getByRole } = renderComponent({
//       user: { userId: 'Test User', userEmail: 'test@test.com' },
//     })
//     expect(getByRole('button').textContent).toBe('log out')
//   })

//   it('Text on log out button is log out', () => {
//     const { getByTestId } = renderComponent({
//       user: { userId: 'Test User', userEmail: 'test@test.com' },
//     })
//     expect(getByTestId('logout').textContent).toBe('log out')
//   })
// })

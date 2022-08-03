import React from 'react'
import { AddNewObservation, AddNewCorner } from '../components/AddNew'
import { render, fireEvent } from '@testing-library/react'

const addOrEdit = jest.fn()
const handleCancel = jest.fn()

describe('Add new observation', () => {
  it('Has a Notes textarea', () => {
    const { getByTestId, getByRole } = render(
      <AddNewObservation currentId="" />,
    )
    expect(getByTestId('observation-textarea')).toBeTruthy()
    expect(getByRole('textbox', { name: /notes/i })).toBeTruthy()
  })

  // it("Can't be added unless there's an observation", () => {
  //   const { getByTestId } = render(<AddNewObservation/>);
  // })
  //
  it('Has an optional setup name', () => {
    const { getByRole } = render(<AddNewObservation currentId="" />)
    expect(
      getByRole('textbox', { name: /setup name \(optional\)/i }),
    ).toBeTruthy()
  })

  it('Calls Add or Edit when submitted', () => {
    const { getByRole } = render(
      <AddNewObservation
        currentId=""
        addOrEdit={addOrEdit}
        handleCancel={handleCancel}
      />,
    )

    fireEvent(getByRole('button', { name: /add/i }), new MouseEvent('click'))

    expect(addOrEdit).toHaveBeenCalled()
  })

  // it("Can be canceled", () => {
  //   const { getByTestId } = render(<AddNewObservation
  //                                   currentId=""
  //                                   handleCancel={handleCancel}
  //                                   addOrEdit={addOrEdit}
  //                                  />);
  //
  //   expect(handleCancel).toHaveBeenCalledTimes(0)
  //   fireEvent(
  //     getByTestId('cancel-button'),
  //     new MouseEvent('click')
  //   )
  //
  //   expect(handleCancel).toHaveBeenCalled()
  // })
})

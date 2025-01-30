import { useState, useEffect } from "react";

// a lot from http://www.codaffection.com/react/react-firebase-crud/

type Props = {
  currentId: any;
  observations: any;
  addOrEdit: any;
  handleCancel: () => void;
};

export const AddNewSetupNote = (props: Props) => {
  const { currentId, observations, addOrEdit, handleCancel } = props;

  const initialFieldValues = {
    notes: "",
    setupName: "",
  };

  const [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...initialFieldValues });
    } else {
      setValues({
        ...observations[currentId],
      });
    }
  }, [currentId, observations]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    addOrEdit(values);
  };

  return (
    <div className="new-observation">
      <form onSubmit={handleFormSubmit} method="post" autoComplete="off">
        <fieldset>
          <ul>
            <li>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={values.notes}
                onChange={handleChange}
                rows={6}
                data-testid="observation-textarea"
              />
            </li>
            <li>
              <label htmlFor="setupName">Setup name (optional)</label>
              <input
                type="text"
                name="setupName"
                id="setupName"
                value={values.setupName}
                onChange={handleChange}
                data-testid="setup-name"
              />
            </li>
            <li className="form-actions">
              <input
                type="submit"
                value={currentId === "" ? "Add" : "Edit"}
                className="button-submit"
              />
              <button
                className="button-link"
                data-testid="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  );
};

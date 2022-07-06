import { useState } from 'react';

export default function useContactForm(submitFunc, initialState) {
  const [formState, setFormState] = useState(initialState);

  const inputChangeHandler = ({ target }) => {
    const { name, value } = target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const reset = () => setFormState(initialState);

  const handleSubmit = event => {
    event.preventDefault();
    submitFunc(formState);
    reset();
  };

  return [formState, inputChangeHandler, handleSubmit];
}
